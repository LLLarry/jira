import { QueryKey, useMutation, useQuery } from "react-query";
import { useEpicSearchParams } from "screens/epic/util";
import { Epic, ReOrderPorp } from "type";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderConfig } from "./use-optimistic-config";

export const useEpics = (params?: Partial<Epic>) => {
    const client = useHttp()
    const result = useQuery<Epic[], Error>(['epics', params], () => client('epics', {
        method: 'GET',
        data: cleanObject(params || {})
    }))
    return result
}

/**
 * 添加看板
 * @returns 
 */
 export const useAddEpic = (queryKey: QueryKey) => {
    const client = useHttp()
    const addConfig = useAddConfig(queryKey)
    const mutation = useMutation<Epic, Error,  Partial<Epic>>((params) => client(`epics`, {
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
 export const useDeleteEpic = () => {
    const param = useEpicSearchParams()
    const queryKey = ['epics', param]
    const client = useHttp()
    const deleteConfig = useDeleteConfig(queryKey)
    const mutation = useMutation<Epic, Error,  Partial<Epic>>((params) => client(`epics/${params.id}`, {
            method: 'DELETE'
        }),
        deleteConfig
    )
    return mutation
}

/**
 * 看板排序
 * @returns 
 */
 export const useReorderEpic = (queryKey: QueryKey) => {
    const client = useHttp()
    const reorderConfig =  useReorderConfig(queryKey)
    const mutation = useMutation<Epic, Error,  Partial<ReOrderPorp>>((params) => client(`epics/reorder`, {
            method: 'POST',
            data: params
        }),
        reorderConfig
    )
    return mutation
}
