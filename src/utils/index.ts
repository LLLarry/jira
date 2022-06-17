import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"

/**
 * 是否是不存在的值
 * @param value 
 * @returns boolean
 */
const isFalsy = (value: any) => value === 0 ? true: !value

/**
 * 删除值为null、undefined、''、 NaN的键
 * @param targetObj 目标元素
 * @returns 格式化之后的值
 */
export const cleanObject = <T extends {[key:string]: any}>(targetObj: T): T => {
  const result = Object.assign({}, targetObj)
  Object.entries(result).forEach(([key, value]) => {
    if(isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

/**
 * 初始化执行Hook
 * @param callback 
 */
export const useMount = (callback: Function) => {
  useEffect(() => {
    callback()
  }, [])
}

/**
 * 防抖Hook
 * @param value 监听变化的值
 * @param time 间隔时间
 * @returns 
 */
export const useDebounce = <T = any>(value: T, time: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), time)
    return () => clearTimeout(timer)
  }, [value, time])
  return debouncedValue
} 

export const useDocumentTitle = (title: string) => {
  const oldTitle = useRef(document.title).current
  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      document.title = oldTitle
    }
  }, [oldTitle])
}

/**
 * 重置路由
 * @returns 
 */
export const resetRoute = () => window.location.href = window.location.origin

/**
 * 作用： 1、获取地址栏中的指定参数 2、设置地址栏中参数
 * @param keys 指定参数list 如： ['name', 'age']
 * @returns [ 参数map, 设置地址栏参数的方法 ]
 */
export const useQueryParams = <K extends string>(keys: K[]) => {
  const [ searchParams ] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const map = useMemo(() => keys.reduce((acc, key) => {
    return {
      ...acc,
      [key]: searchParams.get(key) || ''
    }
  }, {} as { [key in K]: string })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  , [searchParams])
  const setParams = (params: Partial<{[key in K]: unknown}> & {[propKey: string]: unknown}) => {
    return setSearchParams(params)
  }
  return [map, setParams] as const
}

export const useSetUrlSearchParam = () => {
  const [ searchParams, setSearchParams ] = useSearchParams()
  return (param: {[key in string]: unknown}) => {
    const newParams = cleanObject({...Object.fromEntries(searchParams), ...param}) as URLSearchParamsInit
    setSearchParams(newParams)
  }
}

/**
 * 返回组件的挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
