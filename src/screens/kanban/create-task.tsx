import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined"
import { Button, Card, Input } from "antd"
import { useState } from "react"
import { Kanban } from "type"
import { useAddTask } from "utils/task"
import { useTasksQueryKey, useProjectIdInUrl } from "./util"
interface CreateTaskProp extends Pick<Kanban, 'id'>{}
export const CreateTask: React.FC<CreateTaskProp> = ({ id: kanbanId }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTaskAsync } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)
  
  const submit = async () => {
    await addTaskAsync({ name, projectId, kanbanId })
    setName('')
    setInputMode(false)
  }

  if (inputMode) {
    return <Card>
      <Input
        value={name}
        onChange={e => setName(e.target.value) }
        placeholder="请输入任务组名"
        onBlur={() => setInputMode(false)}
        onPressEnter={submit}
      />
    </Card>
  }
  return (
    <div style={{textAlign: 'center'}}>
      <Button icon={<PlusOutlined />} type="dashed" onClick={() => setInputMode(true)}>添加任务组</Button>
    </div>
  )
}