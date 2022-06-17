import { Input } from "antd"
import { useState } from "react"
import { useAddKanban } from "utils/kanban"
import { Container } from "./kanban-column"
import { useKanbansQueryKey, useProjectIdInUrl } from "./util"

export const CreateKanban = () => {
  const { mutateAsync: addKanbanAsync } = useAddKanban(useKanbansQueryKey())
  const projectId = useProjectIdInUrl()
  const [name, setName] = useState('')
  // 提交
  const submit = async () => {
    await addKanbanAsync({
      projectId,
      name
    })
    setName('')
  }
  return <Container>
    <Input placeholder="新建看板名称" size="large" value={name} onChange={e => setName(e.target.value)} onPressEnter={submit} />
  </Container>
}