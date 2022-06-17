import { useCallback, useEffect } from "react"
import { ParamProp, Project } from "type"
import { cleanObject, useQueryParams, useSetUrlSearchParam } from "utils"
import { useHttp } from "./http"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useAsync from "./use-async"
import { useProjectSearchParam } from "screens/project-list/util"
import { useAddConfig, useDeleteConfig, useEditConfig } from "./use-optimistic-config"

export const useProject = (param?: Partial<ParamProp>) => {
    // const { run, ...result } = useAsync<Project[]>()
    const client = useHttp()
    const result = useQuery<Project[], Error>(['project', param], () => client('projects', { data: cleanObject(param || {}) }))
    // useEffect(() => {
    //     const a = () => client('projects', { data: cleanObject(param || {}) })
    //     run(a(), {
    //         retry: a
    //     })
    //     console.log('param', param, { data: cleanObject(param || {})})
    // }, [param])
    return result
}

/**
 * 编辑项目
 * @returns 
 */
export const useEditProject = () => {
    const queryClient = useQueryClient()
    // 获取搜索projects的请求参数 {  personId: number | undefined; name: string }
    const [param] = useProjectSearchParam()
    const queryKey = ['project', param]
    const editConfig = useEditConfig(queryKey)
    const client = useHttp()
    const mutation = useMutation<Project, Error,  Partial<Project>>((params) => client(`projects/${params.id}`, {
            method: 'PATCH',
            data: params
        }),
        editConfig
        // {
        //     // 请求发送后回调（此时后台还未返回数据）params为请求的参数
        //     onMutate (params) {
        //         // 生成queryKey  (要与useProject中useQuery的queryKey一致)
        //         const queryKey = ['project', param]
        //         // 获取缓存的数据，获取的目的是为了返过去，当请求失败时可以进行会滚到当前数据
        //         const previosItems = queryClient.getQueryData<Project[]>(queryKey)
        //         // 通过queryKey找到缓存的projects数据，将数据进行修改
        //         queryClient.setQueryData(queryKey, (old?: Project[]) => {
        //             return old?.map(project => project.id === params.id ? {...project, ...params } : project) || []
        //         })
        //         // 将查询到的数据进行返回，在后台返回结果失败时回滚
        //         return {
        //             previosItems
        //         }
        //     },
        //     // 请求成功后的回调
        //     onSuccess (data, params, context) {
        //         // 重新发送请求
        //         queryClient.invalidateQueries('project')
        //     },
        //     onError (error, params, context) {
        //         // 生成queryKey  (要与useProject中useQuery的queryKey一致)
        //         const queryKey = ['project', param]
        //         // 从context获取onMutate返回的缓存数据进行回滚
        //         queryClient.setQueryData(queryKey, (context as { previosItems: Project[] }).previosItems)
        //     }
        // }
    )
    return mutation
}


/**
 * 添加项目
 * @returns 
 */
 export const useAddProject = () => {
    const [param] = useProjectSearchParam()
    const queryKey = ['project', param]
    const client = useHttp()
    const addConfig = useAddConfig(queryKey)
    const mutation = useMutation<Project, Error,  Partial<Project>>((params) => client(`projects`, {
            method: 'POST',
            data: params
        }),
        addConfig
    )
    return mutation
}

/**
 * 删除项目
 * @returns 
 */
 export const useDeleteProject = () => {
    const [param] = useProjectSearchParam()
    const queryKey = ['project', param]
    const client = useHttp()
    const deleteConfig = useDeleteConfig(queryKey)
    const mutation = useMutation<Project, Error,  Partial<Project>>((params) => client(`projects/${params.id}`, {
            method: 'DELETE'
        }),
        deleteConfig
    )
    return mutation
}
/**
 * 通过url控制modal是否显示隐藏
 */
export const useProjectModal = () => {
    // const [{ projectModalOpen }, setProjectModalOpen ] = useQueryParams(['projectModalOpen'])
    // const [{ editingProjectId }, setUrlSearchParam ] = useQueryParams(['editingProjectId'])
    const [{ projectModalOpen, editingProjectId }, setUrlSearchParam] = useQueryParams(['projectModalOpen', 'editingProjectId'])
    const { data: editingProject, isLoading } = useProjects(Number(editingProjectId))
    // const setUrlSearchParam = useSetUrlSearchParam()
    // 打开
    const open = useCallback(() => {
        setUrlSearchParam({
            projectModalOpen: true,
            editingProjectId: undefined
        })
    }, [])
    const close =() => {
        // setProjectModalOpen({
        //     projectModalOpen: undefined
        // })
        setUrlSearchParam({
            editingProjectId: undefined,
            projectModalOpen: undefined
        })
        
    }
    const startEdit = useCallback((id: number) => {
        setUrlSearchParam({
            editingProjectId: id,
            projectModalOpen: undefined
        })
    }, [])
    return {
        projectModalOpen: projectModalOpen === 'true' || Boolean(editingProjectId),
        open,
        close,
        startEdit,
        isLoading,
        editingProject 
    }
}


export const useProjects = (id?: Project['id']) => {
    const client = useHttp()
    const result = useQuery<Project, Error>(['projects', id], () => client(`projects/${id}`), {
        enabled: !!id
    })
    return result
}