import { useState } from "react"

interface State<D> {
    data: D | null;
    error: Error | null;
    stat: 'idle' | 'loading' | 'success' | 'error';
}
const defaultInitialState: State<null> = {
    data: null,
    error: null,
    stat: 'idle'
}
const defaultConfig = {
    throwOnError: false // 默认不抛出异常
}
/**
 * 异步请求hook
 * @param initialState 初始化状态
 * @param initialConfig 初始化配置
 * @returns 
 */
const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = {
        ...defaultConfig,
        ...initialConfig
    }
    const [state, setState] = useState<State<D>>({
        ...defaultInitialState,
        ...initialState
    })

    // 保存retry函数
    const [retry, setRetry] = useState(() => {
        return (() => {})
    })

    // 设置data
    const setData = (data: D) => {
        setState({
            stat: 'success',
            data,
            error: null
        })
    }

     // 设置error
     const setError = (error: Error) => {
        setState({
            stat: 'error',
            data: null,
            error
        })
    }

    /**
     * 执行promise的函数
     * @param promise 
     * @param runConfig  { retry: () => Promise<D> } 配置的retry函数
     * @returns 
     */
    const run = (promise: Promise<D>, runConfig?: { retry: () =>any }) => {
        if (!promise || !promise.then) {
            throw new TypeError('请传入promise类型的数据')
        }
        console.log('runConfig', runConfig?.retry())
        // 保存函数 run 函数
        setRetry(() => () => {
            if (runConfig?.retry) {
                console.log('runConfig?.retry', runConfig?.retry)
                run(runConfig?.retry(), runConfig)
            }
        })
        setState({
            ...state,
            stat: 'loading'
        })
        return promise
            .then(data => {
                setData(data)
            })
            .catch(error => {
                setError(error)
                if (config.throwOnError) {
                    return Promise.reject(error)
                }
            })
    }

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isSuccess: state.stat === 'success',
        isError: state.stat === 'error',
        setData,
        setError,
        run,
        retry,
        ...state
    }
}

export default useAsync