import { Button } from "antd"
import { login, register } from "auth-provider"

export const LoginScreen = () => {
    const baseURl = process.env.REACT_APP_API_URL
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault()
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value
        console.log({ username, password })
        login({ username, password })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">用户名</label>
                <input type="text" id="username" name="username" />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id="password" name="password" />
            </div>
            <Button type="primary" htmlType="submit">登录</Button>
        </form>
    )
}