import { Button, Input, Select } from "antd"
import { Form } from "antd"
import { useAuth } from "context/auth-context"
import useAsync from "utils/use-async"

export const LoginScreen = ({
  onError
}: {
  onError?: (error: Error) => void
}) => {
  const { login } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })


  const handleSubmit = async ({
    username,
    password
  }: {
    username: string
    password: string
  }) => {
    try {
      await run(login({ username, password }))
    } catch (error) {
      onError && onError(error as Error)
    }
    /**
     * 为什么这里不能使用
     * await run(login({ username, password }))
     * onError(error)
     * 因为 setState是异步执行的， useAsync中是通过setState修改数据的，包括修改error的值；
     * 在setState修改error的值之后，即使我们加上定时器，演示10000ms也不会拿到修改setState修改error之后的值
     */
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
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" block loading={isLoading}>
            登录
          </Button>
        </Form.Item>
      </Form>

    </>
  )
}
