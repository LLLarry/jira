import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import React, { useEffect } from "react"
import { useProjectIdInUrl } from "screens/kanban/util"
import { useAddEpic } from "utils/epic"
import { useEpicsQueryKey } from "./util"

interface CreateEpicProp extends Pick<React.ComponentProps<typeof Drawer>, 'visible'> {
    onClose: () => void;
}
export const CreateEpic: React.FC<CreateEpicProp> = ({ visible, onClose }) => {
    const [form] = useForm()
    const { mutateAsync, isLoading, isError } = useAddEpic(useEpicsQueryKey())
    const projectId = useProjectIdInUrl()
    const onFinish = async (v: any) => {
        await mutateAsync({
            ...v,
            projectId
        })
        onClose()
    }
    useEffect(() => {
        form.resetFields()
    }, [form, visible])
    return <Drawer visible={visible} width={'100%'}>
        <Main>
        {
            (
            <>
              <h1>创建任务组</h1>
              {/* <Typography.Text type="danger" title={error?.message}></Typography.Text> */}
              <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
                <Form.Item label="任务组名称" name="name" rules={[ { required: true, message: '任务组名称不能为空' } ]}>
                  <Input placeholder="请输入任务组名称" />
                </Form.Item>

                <Form.Item style={{textAlign: 'right'}}>
                  <Button htmlType="submit" type="primary">提交</Button>
                </Form.Item>
              </Form>
            </>
          )
        }
        <Button onClick={() => onClose()} loading={isLoading}>关闭</Button>
      </Main>
    </Drawer>
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`