import { render } from "@testing-library/react"
import { Popover, Table, List as AntList, Modal } from "antd"
import { ColumnsType, TableProps } from "antd/lib/table"
import { Pin } from "components/pin"
import dayjs from "dayjs"
import { useCallback, useMemo } from "react"
import { Link } from "react-router-dom"
import { Project, User } from "type"
import { useDeleteProject, useEditProject, useProjectModal } from "utils/project"
import ButtonNoPadding from "components/button-no-padding"
import { useDispatch } from 'react-redux'
import { openprojectModal } from "./project-list-slice"
interface ListProp extends TableProps<Project> {
  users: User[]
}

export const List: React.FC<ListProp> = ({
  users,
  ...config
}) => {

  const { mutate } = useEditProject()
  const handleChange = (id: Project["id"]) => (checked: boolean) => mutate({ id, pin: checked })
  const tableColumns: ColumnsType<Project> = useMemo(
    () => [
      {
        title: <Pin checked />,
        render(value, project) {
          return <Pin checked={project.pin} onChange={handleChange(project.id)} />
        }
      },
      {
        title: "姓名",
        key: "name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        render(value, project) {
          return <Link to={String(project.id)}>{value}</Link>
        }
      },
      {
        title: "部门",
        key: "organization",
        dataIndex: "organization"
      },
      {
        title: "负责人",
        key: "personId",
        dataIndex: "personId",
        render(value, one, index) {
          return (
            <span>
              {users.find((user) => user.id === one.personId)?.name || "未知"}
            </span>
          )
        }
      },
      {
        title: "创建时间",
        render(value, one) {
          return (
            <span>
              {one.created ? dayjs(one.created).format("YYYY-MM-DD") : "无"}
            </span>
          )
        }
      },
      {
        title: "操作",
        render(value, one) {
          return <More project={one} />
        }
      }
    ],
    [users]
  )
  return (
    <>
      <Table
        columns={tableColumns}
        rowKey={(record) => record.id}
        pagination={false}
        {...config}
      />
    </>
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const { mutate } = useDeleteProject()
  const confrimDeleteProject = useCallback((project: Project) => {
    Modal.confirm({
      title: '确认删除当前项目吗？',
      content: '点击“确定”按钮删除',
      okText: '确定',
      onOk () {
        mutate(project)
      }
    })
  }, [mutate])
  return <Popover
    content={
      <AntList>
        <AntList.Item>
          <ButtonNoPadding onClick={() => startEdit(project.id)} type="link">
            编辑
          </ButtonNoPadding>
        </AntList.Item>
        <AntList.Item>
          <ButtonNoPadding type="link" onClick={() => confrimDeleteProject(project)}>
            删除
          </ButtonNoPadding>
        </AntList.Item>
      </AntList>
    }
    trigger="hover"
    placement="bottom"
  >
    ...
  </Popover>
}

// @ts-ignore
// List.whyDidYouRender = true
