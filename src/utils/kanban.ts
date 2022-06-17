import { QueryKey, useMutation, useQuery } from "react-query";
import { useKanbanSearchParams } from "screens/kanban/util";
import { Kanban, ReOrderPorp } from "type";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAddConfig, useDeleteConfig, useReorderConfig } from "./use-optimistic-config";

export const useKanbans = (params?: Partial<Kanban>) => {
    const client = useHttp()
    const result = useQuery<Kanban[], Error>(['kanbans', params], () => client('kanbans', {
        method: 'GET',
        data: cleanObject(params || {})
    }))
    return result
}

/**
 * 添加看板
 * @returns 
 */
 export const useAddKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    const addConfig = useAddConfig(queryKey)
    const mutation = useMutation<Kanban, Error,  Partial<Kanban>>((params) => client(`kanbans`, {
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
 export const useDeleteKanban = () => {
    const param = useKanbanSearchParams()
    const queryKey = ['kanbans', param]
    const client = useHttp()
    const deleteConfig = useDeleteConfig(queryKey)
    const mutation = useMutation<Kanban, Error,  Partial<Kanban>>((params) => client(`kanbans/${params.id}`, {
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
 export const useReorderKanban = (queryKey: QueryKey) => {
    const client = useHttp()
    const reorderConfig =  useReorderConfig(queryKey)
    const mutation = useMutation<Kanban, Error,  Partial<ReOrderPorp>>((params) => client(`kanbans/reorder`, {
            method: 'POST',
            data: params
        }),
        reorderConfig
    )
    return mutation
}
