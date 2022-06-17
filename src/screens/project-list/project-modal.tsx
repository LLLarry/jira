import styled from "@emotion/styled"
import { Button, Drawer, Form, Input, Modal, Space, Spin, Typography } from "antd"
import { useForm } from "antd/lib/form/Form"
import ButtonNoPadding from "components/button-no-padding"
import { UserSelect } from "components/user-select"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Project } from "type"
import { useAddProject, useEditProject, useProjectModal } from "utils/project"
import { openprojectModal, selectProjectModalOpen } from "./project-list-slice"

export const ProjectModal: React.FC = () => {
  const { open, close, projectModalOpen, isLoading, editingProject } = useProjectModal()
  // const useMutateProject = editingProject ? useEditProject : useAddProject
  // const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()
  const { mutateAsync: editMutateAsync } = useEditProject()
  const { mutateAsync: addMutateAsync } = useAddProject()
  const [ form ] = useForm()
  const title = editingProject ? '编辑项目' : '创建项目'
  const onFinish = (values: Pick<Project, 'name' | 'organization' | 'personId'>) => {
    const mutateAsync = editingProject ? editMutateAsync : addMutateAsync
    mutateAsync({ ...editingProject, ...values }).then(res => {
      //　重置表单
      form.resetFields()
      close()
    })
  }
  
  // 当接收到editingProject数据时，设置到form中
  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  // modal关闭时，重新设置form初始值
  useEffect(() => {
    !projectModalOpen && form.resetFields()
  }, [projectModalOpen, form])
  return (
    <Drawer
      title="Drawer with extra actions"
      width={"100%"}
      onClose={() => close()}
      visible={projectModalOpen}
      forceRender
    >
      <Main>
        {
          isLoading ? <Spin size="large"></Spin> : (
            <>
              <h1>{title}</h1>
              {/* <Typography.Text type="danger" title={error?.message}></Typography.Text> */}
              <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
                <Form.Item label="名称" name="name" rules={[ { required: true, message: '项目名称不能为空' } ]}>
                  <Input placeholder="请输入项目名称" />
                </Form.Item>

                <Form.Item label="部门" name="organization" rules={[ { required: true, message: '部门名称不能为空' } ]}>
                  <Input placeholder="请输入部门名称" />
                </Form.Item>


                <Form.Item label="负责人" name="personId">
                  <UserSelect defaultOptionName="负责人"></UserSelect>
                </Form.Item>

                <Form.Item style={{textAlign: 'right'}}>
                  <Button htmlType="submit" type="primary">提交</Button>
                </Form.Item>
              </Form>
            </>
          )
        }
        <Button onClick={() => close()}>关闭</Button>
      </Main>
    </Drawer>
  )
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
