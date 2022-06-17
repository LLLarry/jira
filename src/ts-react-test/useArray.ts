import { useCallback, useState } from "react"

const useArray = <T>(initValue: T[]) => {
    const [value, setValue] = useState(initValue)
    const add = useCallback((one: T) => {
        // setValue(preValue => {
        //     return [
        //         ...preValue,
        //         one
        //     ]
        // })
        setValue([...value, one])
    }, [setValue, value])

    const removeIndex = useCallback((index: number) => {
        setValue(preValue => {
            const copyValue = [...preValue]
            copyValue.splice(index, 1)
            return copyValue
        })
    }, [setValue])

    const clean = useCallback(() => {
        setValue([])
    }, [])
    return {
        value,
        add,
        removeIndex,
        clean
    }
}
export default useArray