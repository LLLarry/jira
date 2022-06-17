import styled from "@emotion/styled"
import { Form, Select } from "antd"
import Input from "antd/lib/input/Input"
import { UserSelect } from "components/user-select"
import { ParamProp, User } from "type"

interface SearchPanelProp {
  users: User[]
  param: Partial<ParamProp>
  setParam: (param: Partial<ParamProp>) => void
}
export const SearchPanel: React.FC<SearchPanelProp> = ({
  param,
  users,
  setParam
}) => {
  return (
    <Container>
      <Form layout="inline">
        <Form.Item>
          <Input
            defaultValue={param.name}
            onChange={(evt) =>
              setParam({
                ...param,
                name: evt.target.value
              })
            }
            placeholder="请输入姓名"
          />
        </Form.Item>
        <Form.Item>
          <UserSelect
            defaultOptionName="负责人"
            value={param.personId}
            onChange={(value) => {
              setParam({
                ...param,
                personId: value
              })
            }}
          ></UserSelect>
          {/* <Select
            defaultValue={param.personId}
            onChange={(value) =>
              setParam({
                ...param,
                personId: value
              })
            }
          >
            <Select.Option value={""}>负责人</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select> */}
        </Form.Item>
      </Form>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 2rem;
`
