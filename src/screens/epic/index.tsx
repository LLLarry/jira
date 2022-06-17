import { Button, List, Modal } from "antd"
import ButtonNoPadding from "components/button-no-padding"
import { Row } from "components/lib/row"
import dayjs from "dayjs"
import { useState } from "react"
import { useNavigate } from "react-router"
import { ScreenContainer } from "screens/kanban"
import { useProjectIdInUrl, useProjectInUrl } from "screens/kanban/util"
import { Epic } from "type"
import { useDeleteEpic, useEpics } from "utils/epic"
import { useTasks } from "utils/task"
import { CreateEpic } from "./create-epic"
import { useEpicSearchParams } from "./util"

export const EpicScreen = () => {
    const { data: currentProject } = useProjectInUrl()
    const { data: epics } = useEpics(useEpicSearchParams())
    const { data: tasks } = useTasks({ projectId: currentProject?.id })
    const navigate = useNavigate()
    const [creactEpicVisible, setCreactEpicVisible] = useState(false)
    const { mutateAsync: deleteEpicMutate } = useDeleteEpic()
    const deleteEpic = (epic: Epic) => {
        Modal.confirm({
            okText: '确定',
            cancelText: '取消',
            title: '提示',
            content: '确认删除此任务组吗？',
            onOk () {
                deleteEpicMutate(epic)
            }
        })
        
    }
    return (
        <ScreenContainer>
            <Row between={true}>
                <h3>{currentProject?.name}看板</h3>
                <ButtonNoPadding type="link" onClick={() => setCreactEpicVisible(true)}>创建任务组</ButtonNoPadding>
            </Row>
            <List dataSource={epics} itemLayout="vertical" renderItem={(epic) => (
                <List.Item>
                    <List.Item.Meta 
                        title={<Row between>
                                    <span>{ epic.name }</span>
                                    <Button type="link" onClick={() => deleteEpic(epic)}>删除</Button>
                                </Row>}
                        description={
                            <div>
                                <div>
                                    开始时间：{ dayjs(epic.start).format('YYYY-MM-DD') }
                                </div>
                                <div>
                                    结束时间：{ dayjs(epic.end).format('YYYY-MM-DD') }
                                </div>
                            </div>
                        } 
                    />
                    {
                        tasks?.filter(task => task.epicId === epic.id).map(one => (
                            <ButtonNoPadding 
                                key={one.id}
                                type="link"
                                style={{ textAlign: 'left' }}
                                block
                                onClick={() => navigate(`/project/${currentProject?.id}/kanban?editingTaskId=${one.id}`)}
                            >{ one.name }</ButtonNoPadding>
                        ))
                    }
                </List.Item>
            )} />
            <CreateEpic visible={creactEpicVisible} onClose={() => setCreactEpicVisible(false)} />
        </ScreenContainer>
    )
}