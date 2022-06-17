import { useCallback, useEffect, useMemo, useState } from "react"
import { DropResult } from "react-beautiful-dnd"
import { useParams } from "react-router"
import { useDebounce, useQueryParams } from "utils"
import { useKanbans, useReorderKanban } from "utils/kanban"
import { useProjects } from "utils/project"
import { useReorderTask, useTask, useTasks } from "utils/task"
export const useProjectIdInUrl = () => {
    const { projectId } = useParams()
    const id = Number(projectId)
    return id
}
/**
 * 通过获取地址栏中projectId来获取对应project数据
 * @returns 
 */
export const useProjectInUrl = () => {
    const projectId = useProjectIdInUrl()
    return useProjects(projectId)
}

/**
 * 获取看板搜索参数
 * @returns 
 */
export const useKanbanSearchParams = () => {
    const projectId = useProjectIdInUrl()
    return { projectId }
}

export const useKanbansQueryKey = () => (['kanbans', useKanbanSearchParams()])

/**
 * 从地址栏中获取看板搜索参数
 * @returns 
 */
 export const useTaskSearchParams = () => {
    const projectId = useProjectIdInUrl()
    const [params] = useQueryParams(['name', 'typeId', 'processorId', 'tagId'])
    return useMemo(() => {
        const name = params.name
        const typeId = Number(params.typeId) || undefined
        const processorId = Number(params.processorId) || undefined
        const tagId = Number(params.tagId) || undefined
        return { projectId, name, typeId, processorId, tagId }
    }, [projectId, params])
}

export const useTasksQueryKey = () => (['tasks', useTaskSearchParams()])

/**
 * 编辑task模态框hook
 * @returns 
 */
export const useTaskModal = () => {
    // 正在编辑的task id 这里不能使用useState，因为useTaskModal需要在多个组件之间使用，而且多个组件之间需要共同使用editingTaskId
    // 所以editingTaskId就放在地址栏中来共享数据
    // const [editingTaskId, setEditingTaskId] = useState('')
    const [{ editingTaskId }, setEditingTaskId] = useQueryParams(['editingTaskId'])
    // 通过task id 查询task
    const { data: editingTask, isLoading  } = useTask(Number(editingTaskId))
    const startEdit = useCallback((id: number | string) => {
        setEditingTaskId({
            editingTaskId: id
        })
    }, [setEditingTaskId])
    const close = useCallback(() => {
        setEditingTaskId({
            editingTaskId: ''
        })
    }, [setEditingTaskId])
    return {
        editingTaskId,
        startEdit,
        close,
        editingTask,
        isLoading
    }
}

export const useSortList = () => {
    const { data: kanbans } = useKanbans(useKanbanSearchParams())
    const { data: allTasks } = useTasks(useTaskSearchParams())
    const { mutateAsync: kanbanMutateAsync } = useReorderKanban(useKanbansQueryKey())
    const { mutateAsync: taskMutateAsync } = useReorderTask(useTasksQueryKey())
    const updateSort = ({ source, destination, type }: DropResult) => {
        console.log(type)
        if (type === 'COLUMN') {
            if (!destination || destination.index === source.index) return
            console.log(destination.index, source.index)
            const fromId = kanbans?.[source.index].id
            const toId = kanbans?.[destination.index].id
            const type = destination.index > source.index ? 'after' : 'before'
            if (typeof fromId === 'undefined' || typeof toId === 'undefined') return
            kanbanMutateAsync({ fromId, referenceId: toId, type })
        } else {
            const fromKanbanId = Number(destination?.droppableId.split('-')[1])
            const toKanbanId = Number(destination?.droppableId.split('-')[1])
            const fromTasks = allTasks?.filter(task => task.kanbanId === fromKanbanId) || []
            const toTasks = allTasks?.filter(task => task.kanbanId === toKanbanId) || []
            if (!destination) return
            const fromId = fromTasks?.[source.index].id
            const toId = toTasks?.[destination.index].id
            const type = destination.index > source.index ? 'after' : 'before'
            taskMutateAsync({ fromId, referenceId: toId, type, fromKanbanId: fromKanbanId, toKanbanId: toKanbanId })
        }
        
    }
    return updateSort
}