import { Button, Input } from "antd"
import { Form } from "antd"
import { useAuth } from "context/auth-context"
import useAsync from "utils/use-async"

export const RegisterScreen = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })
  const handleSubmit = async ({
    username,
    password,
    cpassword
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    try {
      if (password !== cpassword) {
        throw new Error("两次输入的密码不一致")
      }
      await run(register({ username, password }))
    } catch (error) {
      onError && onError(error as Error)
    }
  }
  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input type="text" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input type="password" placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="cpassword"
          rules={[{ required: true, message: "确认密码" }]}
        >
          <Input type="password" placeholder="确认密码" />
        </Form.Item>
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
