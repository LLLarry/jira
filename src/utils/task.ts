import { QueryKey, useMutation, useQuery } from "react-query";
import { useTaskSearchParams } from "screens/kanban/util";
import { ReOrderPorp, Task } from "type";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useEditConfig, useReorderConfig } from "./use-optimistic-config";

export const useTasks = (params?: Partial<Task>) => {
    const client = useHttp()
    const result = useQuery<Task[], Error>(['tasks', params], () => client('tasks', {
        method: 'GET',
        data: cleanObject(params || {})
    }))
    return result
}

/**
 * 添加任务组
 * @returns 
 */
 export const useAddTask = (queryKey: QueryKey) => {
    const client = useHttp()
    const addConfig = useAddConfig(queryKey)
    const mutation = useMutation<Task, Error,  Partial<Task>>((params) => client(`tasks`, {
            method: 'POST',
            data: params
        }),
        addConfig
    )
    return mutation
}

export const useTask = (taskId?: Task['id']) => {
    const client = useHttp()
    const result = useQuery<Task, Error>(['tasks', taskId], () => client(`tasks/${taskId}`), {
        enabled: !!taskId // 0 false undefined 禁止请求
    })
    return result
}

/**
 * 编辑task
 * @param queryKey 
 */
export const useEditTask  = (queryKey: QueryKey) => {
    const client = useHttp()
    const editConfig = useEditConfig(queryKey)
    const mutation = useMutation<Task, Error,  Partial<Task>>(
        params => client(`tasks/${params.id}`,
        {
            method: 'PATCH',
            data: params
        }),
        editConfig
    )
    return mutation
}


/**
 * 删除任务组
 * @returns 
 */
 export const useDeleteTask = () => {
    const param = useTaskSearchParams()
    const queryKey = ['tasks', param]
    const client = useHttp()
    const deleteConfig = useDeleteConfig(queryKey)
    const mutation = useMutation<Task, Error,  Partial<Task>>((params) => client(`tasks/${params.id}`, {
            method: 'DELETE'
        }),
        deleteConfig
    )
    return mutation
}

/**
 * 任务组排序
 * @returns 
 */
 export const useReorderTask = (queryKey: QueryKey) => {
    const client = useHttp()
    const reorderConfig =  useReorderConfig(queryKey)
    const mutation = useMutation<Task, Error,  Partial<ReOrderPorp>>((params) => client(`tasks/reorder`, {
            method: 'POST',
            data: params
        }),
        reorderConfig
    )
   
    return mutation
}

