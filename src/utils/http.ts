import { logout } from "auth-provider"
import { useAuth } from "context/auth-context"
import qs from "qs"

interface HttpConfig extends RequestInit {
    data?: { [key: string]: any };
    token?: string;
}

const baseUrl = process.env.REACT_APP_API_URL
// 请求函数
const http = (endPoint: string, { method = 'GET', data, token, ...customConfig }: HttpConfig = {}) => {
    const config = {
        method,
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            ['Content-Type']: data ? 'application/json' : ''
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endPoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data)
    }
    return window.fetch(`${baseUrl}/${endPoint}`, config).then(async res => {
        if (res.status === 401 && !endPoint.startsWith('me')) { // token验证失败
            // logout()
            window.location.reload()
            return Promise.reject('token已失效')
        } else if (res.status === 401 && endPoint.startsWith('me')) {
            logout()
        }
        const data = await res.json()
        if (res.ok) {
            return data
        } else {
            if (res.status !== 401) return Promise.reject(data)
        }
    })
}
export default http

/**
 * 请求hook
 * @returns promise
 */
export const useHttp = () => {
    const { user } = useAuth() // 获取用户信息
    return (...[endPoint, config]: Parameters<typeof http>) => http(endPoint, { ...config, token: user?.token })
}