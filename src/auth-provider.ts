import { LoginOrRegisterParam, User } from "type"

const baseURl = process.env.REACT_APP_API_URL
const initTokenKey = '__init_token_key__'

export const getToken = () => window.localStorage.getItem(initTokenKey) || ''
export const setToken = (token: string) => window.localStorage.setItem(initTokenKey, token || '')
export const removeToken = () => window.localStorage.removeItem(initTokenKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    setToken(user.token || '')
    return user
}

export const register = ({ username, password }: LoginOrRegisterParam) => {
    return fetch(`${baseURl}/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, password })
    })
        .then(async response => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                return Promise.reject(await response.json())
            }
        })
}

export const login = ({ username, password }: LoginOrRegisterParam) => {
    return fetch(`${baseURl}/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username, password })
    })
        .then(async response => {
            if (response.ok) {
                return handleUserResponse(await response.json())
            } else {
                return Promise.reject(await response.json())
            }
        })
}

export const logout = async () => {
    removeToken()
}