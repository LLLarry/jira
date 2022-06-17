import styled from "@emotion/styled"
import { List, Popover, Typography } from "antd"
import { useProject, useProjectModal } from "utils/project"
import { useDispatch } from 'react-redux'
import { openprojectModal } from "./project-list-slice"
import ButtonNoPadding from "components/button-no-padding"

export const ProjectPopover = () => {
  const { open } = useProjectModal()
  const { data = [] } = useProject()
  const projects = data?.filter((item) => !item.pin) || []
  const content = (
    <Container>
      <Typography.Text>收藏项目</Typography.Text>
      <List>
        {projects.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
        <List.Item>
          <ButtonNoPadding onClick={() => open()} type="link">
            创建项目
          </ButtonNoPadding>
        </List.Item>
      </List>
    </Container>
  )
  return (
    <Popover content={content} trigger="hover" placement="bottom">
      <h3>收藏</h3>
    </Popover>
  )
}

const Container = styled.div`
  min-width: 30rem;
  cursor: pointer;
`
