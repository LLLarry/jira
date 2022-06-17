import { Button, Dropdown, Menu, Modal } from "antd"
import { Kanban } from "type"
import { useDeleteKanban } from "utils/kanban"
interface MoreProp {
  kanban: Kanban;
}
export const More: React.FC<MoreProp> = ({ kanban }) => {
  const { mutateAsync } = useDeleteKanban()
  const handleDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      content: '确定删除吗？',
      onOk () {
        mutateAsync({
          id: kanban.id
        })
      }
    })
  }
  return (
    <Dropdown overlay={
      <Menu items={
        [
          {
            key: 1,
            label: <Button size="small" onClick={handleDelete}>删除</Button>
          }
        ]
      }>
      </Menu>
    }>
      <Button type="link">···</Button>
    </Dropdown>
  )
}