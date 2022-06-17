import React from 'react'
import { DragDropContext, Droppable, Draggable, DragDropContextProps, DroppableProps, DropResult } from 'react-beautiful-dnd'

interface DropProp<T> extends Omit<DroppableProps, 'children'> , Partial<Pick<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'>>{
  list: T[]; // 渲染list
  render: (t: T) => JSX.Element | null ; // 返回组件的渲染函数
  onDragEnd?: (newList: T[], type: DropProp<T>['type'], result: DropResult) => void; // 拖拽完成之后的回调
}

export function Drop <T extends { id: unknown }>({ 
  list, 
  render,
  onDragEnd: dragEnd,
  style,
  className,
  ...droppableConfig
}: DropProp<T>) {
  // 拖拽结束
  const onDragEnd: DragDropContextProps['onDragEnd'] = (result, provided) => {
    const { destination, source } = result
    // 没有换位置
    if (!destination) return
    const { index: moveStartIndex } = source
    const { index: moveEndIndex } = destination
    // 生成新的list
    const newList = JSON.parse(JSON.stringify(list)) as T[]
    const target = newList[moveStartIndex]
    newList.splice(moveStartIndex, 1)
    newList.splice(moveEndIndex, 0, target)
    // 向外界传递
    dragEnd?.(newList, droppableConfig.type, result)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable {...droppableConfig}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={className}
              style={style}
            >
              {list.map((item, index) => (
                <Draggable key={String(item.id)} draggableId={String(item.id)} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {render(item)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  )
}