import { Button, Input } from "antd"
import { Row } from "components/lib/row"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/user-select"
import { useEffect, useState } from "react"
import { useDebounce, useQueryParams, useSetUrlSearchParam } from "utils"
import { useTaskSearchParams } from "./util"

export const SearchPanel = () => {
  const params = useTaskSearchParams()
  const setParams = useSetUrlSearchParam()
  const [name, setName] = useState(params.name)
  const reset = () => {
    setParams({
      name: undefined,
      processorId: undefined,
      typeId: undefined
    })
    setName('')
  }
  const debounceName = useDebounce(name, 500)
  useEffect(() => {
    setParams({
      name: debounceName
    })
  }, [debounceName])
  return (
    <div style={{marginBottom: '10px'}}>
      <Row gap={4}>
        <Input placeholder="任务名" value={name} onChange={e => setName(e.target.value)} style={{width: '20rem'}} />
        <UserSelect defaultOptionName="经办人" value={params.processorId} onChange={v => setParams({ processorId: v })} /> 
        <TaskTypeSelect defaultOptionName="类型" value={params.typeId} onChange={v => setParams({ typeId: v })} />
        <Button type="dashed" onClick={reset}>清除筛选器</Button>
      </Row>
    </div>
  )
}