import styled from "@emotion/styled"
import { List, Popover, Typography } from "antd"
import { useProject, useProjectModal } from "utils/project"
import { useDispatch } from 'react-redux'
import { openprojectModal } from "./project-list-slice"
import ButtonNoPadding from "components/button-no-padding"
import useUsers from "utils/user"

export const UserPopover = () => {
  const { open } = useProjectModal()
  const { data: users = [] } = useUsers()
  const content = (
    <Container>
      <Typography.Text>组员列表</Typography.Text>
      <List>
        {users.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </Container>
  )
  return (
    <Popover content={content} trigger="hover" placement="bottom">
      <h3>用户</h3>
    </Popover>
  )
}

const Container = styled.div`
  min-width: 30rem;
  cursor: pointer;
`
