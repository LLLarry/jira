import styled from "@emotion/styled"
import { useEffect, useMemo, useState } from "react"
import { ParamProp, User } from "type"
import { useDebounce, useDocumentTitle, useMount, useQueryParams, useSetUrlSearchParam } from "utils"
import { useHttp } from "utils/http"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useProject } from "utils/project"
import useUser from "utils/user"
import { useProjectSearchParam } from "./util"
import { Button } from "antd"
import { Row } from "components/lib/row"
import ButtonNoPadding from "components/button-no-padding"
interface ProjectListScreensProp {
  // projectButton: JSX.Element
}

export const ProjectListScreens: React.FC<ProjectListScreensProp> = () => {
  // 设置页面标题
  useDocumentTitle("项目列表")
  // const client = useHttp()
  // 搜索条件
  // const [param, setParam] = useState<ParamProp>({
  //   name: '',
  //   personId: ''
  // })

  // const [param, setParam] = useQueryParams(["name", "personId"])
  // const projectParam = useMemo(() => {
  //   return {
  //     ...param,
  //     personId: Number(param.personId) || undefined
  //   }
  // }, [param])
  const setUrlSearchParam = useSetUrlSearchParam()
  const [param, setParam] = useProjectSearchParam()
  // 负责人 users
  // const [users, setUsers] = useState<User[]>([])
  // 搜索出来的数据
  const debounceValue = useDebounce(param, 1000)
  // 条件变化搜索记录
  const { data: list, isLoading } = useProject(debounceValue)
  // 获取所有用户
  // useMount(() => {
  //   // fetch(`${baseUrl}/users`).then(async response => {
  //   //   if (response.ok) {
  //   //     setUsers(await response.json())
  //   //   }
  //   // })
  //   client('users').then(res => setUsers(res))
  // })
  const { data: users } = useUser()
  return (
    <Container>
      <Row between={true}>
        <h1 style={{ fontSize: '25px' }}>项目列表</h1>
        <ButtonNoPadding type="link" onClick={() => setUrlSearchParam({projectModalOpen: true})}>添加项目</ButtonNoPadding>
      </Row>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
      ></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
`
