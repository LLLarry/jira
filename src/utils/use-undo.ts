import { useCallback, useMemo, useReducer, useState } from 'react'
interface StateProp<T> {
  undoList: T[];
  current: T;
  redoList: T[];
}
type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  payload?: T;
}

const UNDO = 'UNDO',
      REDO = 'REDO',
      SET = 'SET',
      RESET = 'RESET'
const useUnDo = <T>(initialVal: T) => {
  const initState: StateProp<T> = {
    undoList: [],
    current: initialVal,
    redoList: []
  }
  // reducer 函数
  const reducer = (state: StateProp<T>, action: Action<T>) => {
    const { undoList, current, redoList } = state
    switch (action.type) {
      // 后退
      case UNDO: 
        {
          const canUndo = undoList.length !== 0
          if (!canUndo) return  state     
          const newUndoList = undoList.slice(0, undoList.length - 1) // 新向前list
          const newCurrent = undoList[undoList.length - 1] // 新当前数据
          const newRedoList = [current, ...redoList] // 新向后list
          return {
            undoList: newUndoList,
            current: newCurrent,
            redoList: newRedoList
          }
        }
      // 前进
      case REDO:
        {
          const canRedo = redoList.length !== 0
          if (!canRedo) return state
          const newRedoList = redoList.slice(1) // 新向后list
          const newCurrent = redoList[0] // 新当前数据
          const newUndoList =  [...undoList, newCurrent] // 新向前list
          return {
            undoList: newUndoList,
            current: newCurrent,
            redoList: newRedoList
          }
        }
      // 重置
      case RESET:
        {
          return {
            undoList: [],
            current: action.payload as T,
            redoList: []
          }
        }
      case SET: 
        {
          return {
            undoList: [...undoList, current],
            current: action.payload as T,
            redoList: []
          } 
        }
    }
    return state
  }
  // 执行useReducer hook
  const [ state, dispatch ] = useReducer(reducer, initState)

  // 是否可以向后移动
  const canRedo = useMemo(() => {
    return state.redoList.length !== 0
  }, [state])
  // 是否可以向前移动
  const canUndo = useMemo(() => {
    return state.undoList.length !== 0
  }, [state])

  // 后退一步
  const undo = useCallback(() => {
    dispatch({
      type: UNDO
    })
  }, [])

    // 前进一步
    const redo = useCallback(() => {
      dispatch({
        type: REDO
      })
    }, [])

     /**
     * 重新设置初始值
     * @param v 
     */
      const set = useCallback((v: T) => {
        dispatch({
          type: SET,
          payload: v
        })
      }, [])
  

    /**
     * 重新设置初始值
     * @param v 
     */
    const reset = useCallback((v: T) => {
      dispatch({
        type: RESET,
        payload: v
      })
    }, [])

    return [
      { ...state, canRedo, canUndo },
      { undo, redo, reset, set }
    ] as const
}

export default useUnDo