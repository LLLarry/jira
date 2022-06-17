import { Button } from "antd";
import useUnDo from "utils/use-undo";

export const Test = () => {
    const [
        { undoList, current, redoList, canRedo, canUndo },
        { undo, redo, reset, set }
      ] = useUnDo(1)
    return (
        <>
            <h1>{current}</h1>
            <div>
                <Button onClick={() => set(current + 1)}>增加</Button>
                <Button onClick={() => set(current - 1)}>减少</Button>
                <Button disabled={!canUndo} onClick={() => undo()}>undo</Button>
                <Button disabled={!canRedo} onClick={() => redo()}>redo</Button>
                <Button onClick={() => reset(1)}>reset</Button>
                <div>
                undoList: {undoList.join(',')}
                </div>
                <div>
                redoList: {redoList.join(',')}
                </div>
            </div>
        </>
    )
}