import styled from "@emotion/styled"
import { Button, Form, Input, Modal, Spin } from "antd"
import { useForm } from "antd/lib/form/Form"
import { TaskTypeSelect } from "components/task-type-select"
import { UserSelect } from "components/user-select"
import { useEffect } from "react"
import { useDeleteTask, useEditTask } from "utils/task"
import { useTaskModal, useTasksQueryKey } from "./util"

export const EditTaskModal = () => {
    const { editingTaskId, editingTask, close, isLoading: initDataLoading } = useTaskModal()
    const { mutateAsync: editTaskAsync, isLoading } = useEditTask(useTasksQueryKey())
    const [form] = useForm()
    const { mutateAsync: deleteTask } = useDeleteTask()
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 8}
    }
    const submit = async () => {
        await editTaskAsync({ id: Number(editingTaskId), ...form.getFieldsValue() })
        close()
    }

    const handleDelete = async () => {
        if (!editingTask) return
        await deleteTask(editingTask)
        close()
    }

    useEffect(() => {
        form.setFieldsValue(editingTask)
    }, [form, editingTask])
    return (
       <>
         <Modal
            visible={!!editingTaskId}
            forceRender={true}
            title="编辑Task"
            cancelText="取消"
            okText="确定"
            onCancel={close}
            onOk={submit}
            confirmLoading={isLoading}
        >
            {
                initDataLoading ? <SpinContainer><Spin size="large"></Spin></SpinContainer> :
                <>
                    <Form {...layout} form={form} initialValues={editingTask}>
                        <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入名称' }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="经办人" name="processorId">
                            <UserSelect defaultOptionName="经办人" />
                        </Form.Item>
                        <Form.Item label="类型" name="typeId">
                            <TaskTypeSelect />
                        </Form.Item>
                    </Form>
                    <div style={{textAlign: 'right'}}>
                        <Button type='dashed' danger size="small" onClick={handleDelete}>删除当前任务组</Button>
                    </div>
                </>
            }
        </Modal>
       </>
    )
}

const SpinContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`