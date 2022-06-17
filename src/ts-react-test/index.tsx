import { useCallback, useState } from "react"
import useArray from "./useArray"

export const TsReactTest = () => {
    const persons: { name: string; age: number }[] = [
        { name: '张三', age: 18 },
        { name: '李四', age: 19 },
    ]
    // const { value, removeIndex, clean, add } = useArray(persons)

    const [value2, setValue2] = useState<any>(null)
    const set = (one: any) => {
        setValue2(one)
    }
    const get = () => {
        console.log(value2)
    }
    return (
        <>
            {/* <ul>
                {
                    value2.map((item, index) => (
                        <li key={index}>
                            <span>{index}</span>
                            -
                            <span>[{item.name}, {item.age}]</span>
                        </li>
                    ))
                }
            </ul> */}
            <div>
                {/* <button onClick={() => add2({ name: 'zz', age: 20 })}>添加</button> */}
                {/* <button onClick={() => removeIndex(0)}>移除</button> */}
                {/* <button onClick={() => clean()}>清除</button> */}
                <button onClick={() => set(1)}>set</button>
                <button onClick={() => get()}>get</button>
            </div>
        </>
    )
}