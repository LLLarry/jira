import React from "react";
import { Kanban, Task } from "type"
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useSortList, useTaskModal, useTaskSearchParams } from "./util";
import bugIcon from 'assets/svgs/bug-fill.svg'
import taskIcon from 'assets/svgs/task_fill.svg'
import { Card } from "antd";
import { ReactSVG } from "react-svg";
import styled from "@emotion/styled";
import { CreateTask } from "./create-task";
import { Mark } from "components/mark";
import { More } from "components/more";
import { Row } from "components/lib/row";
import { Drop } from "components/drop";

interface KanbanColumnProp {
    kanban: Kanban;
}

export const KanbanColumn: React.FC<KanbanColumnProp> = ({ kanban }) => {
    const { data: allTasks} = useTasks(useTaskSearchParams())
    const updateSort = useSortList()
    let tasks = allTasks?.filter(task => task.kanbanId === kanban.id) || []
    const dropUniqKey = `task-${kanban.id}`
    return (
        <Container>
            <Row between={true}>
                <Title>{ kanban.name }{dropUniqKey}</Title>
                <More kanban={kanban} />
            </Row>
            <Drop
                droppableId={dropUniqKey}
                type="ROW"
                list={tasks}
                render={(task) => TaskCard({ task })}
                onDragEnd={(list, droppableId, result) => {
                    updateSort(result)
                }}
            />
            {/* {
                tasks.map(task => (
                    <TaskCard task={task} key={task.id} />
                ))
            } */}
            <CreateTask id={kanban.id} />
        </Container>
    )
}

const TaskCard = ({ task }: { task: Task }) => {
    const { startEdit } = useTaskModal()
    const { name: keywords } = useTaskSearchParams()
    return (
        <Card
            onClick={() => startEdit(task.id)}
            key={task.id}
            style={{ marginBottom: '1rem', cursor: 'pointer' }}
        >
            <Mark keywords={keywords} target={task.name} />
            <TaskTypeIcon typeId={task.typeId} />
        </Card>
    )
}

const TaskTypeIcon = ({ typeId }: Pick<Task, 'typeId'>) => {
    const { data: taskTypes } = useTaskTypes()
    const name = taskTypes?.find(taskType => taskType.id === typeId)?.name
    if (!name) return null
    return <ReactSVG beforeInjection={(svg) => {
        svg.classList.add('svg-class-name')
        svg.setAttribute('style', 'width: 16px; height: 16px')
      }} src={name === 'task' ? taskIcon : bugIcon} />
}

export const Container = styled.div`
    width: 26rem;
    border-radius: 6px;
    padding: 1.5rem;
    margin-right: 1.5rem;
    background-color: rgb(244, 245, 247);
    flex-shrink: 0;
`
const Title = styled.h6`
    margin-bottom: 0.5rem;
    font-size: 14px;
`