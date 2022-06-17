import { QueryKey, useQueryClient } from "react-query";

/**
 * 
 * @param queryKey 插叙缓存list的queryKey
 * @param callback 处理函数，编辑时找到对应项更新；添加时，在尾部新增数据；删除时，找到对应的数据进行删除
 * @returns 
 */
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) =>  any[] ) => {
  const queryClient = useQueryClient()
  return {
    // 请求发送后回调（此时后台还未返回数据）params为请求的参数
      onMutate (params: any) {
          // 获取缓存的数据，获取的目的是为了返过去，当请求失败时可以进行会滚到当前数据
          const previosItems = queryClient.getQueryData<any[]>(queryKey)
          // 通过queryKey找到缓存的projects数据，将数据进行修改
          queryClient.setQueryData(queryKey, (old?: any[]) => {
              return callback(params, old)
          })
          // 将查询到的数据进行返回，在后台返回结果失败时回滚
          return {
              previosItems
          }
      },
      // 请求成功后的回调
      onSuccess () {
          // 重新发送请求
          queryClient.invalidateQueries(queryKey)
      },
      onError (error: Error, params: any, context: any) {
          // 从context获取onMutate返回的缓存数据进行回滚
          queryClient.setQueryData(queryKey, context.previosItems)
      }
  }
}
/**
 * 编辑配置
 * @param queryKey 
 * @returns 
 */
export const useEditConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => (
    old?.map(one => one.id === target.id ? {...one, ...target } : one) || []
  ))
}

/**
 * 新增配置
 * @param queryKey 
 * @returns 
 */
 export const useAddConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => (
    old ? [...old, { ...target, id: new Date().getTime()}] : []
  ))
}

/**
 * 删除配置
 * @param queryKey 
 * @returns 
 */
 export const useDeleteConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => (
    old?.filter(one => one.id !== target.id) || []
  ))
}

/**
 * 排序配置
 * @param queryKey 
 * @returns 
 */
 export const useReorderConfig = (queryKey: QueryKey) => {
  return useConfig(queryKey, (target, old) => old || []) 
}