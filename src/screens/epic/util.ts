import { useProjectIdInUrl } from "screens/kanban/util"

/**
 * 获取看板搜索参数
 * @returns 
 */
 export const useEpicSearchParams = () => {
    const projectId = useProjectIdInUrl()
    return { projectId }
}

export const useEpicsQueryKey = () => (['epics', useEpicSearchParams()])