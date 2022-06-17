import { getToken, login, logout, register } from "auth-provider"
import {
  FullPageErrorFallback,
  FullPageLoading
} from "components/lib/full-page"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useQueryClient } from "react-query"
import { LoginOrRegisterParam, User } from "type"
import { useMount } from "utils"
import http from "utils/http"
import useAsync from "utils/use-async"
interface AuthProviderProp extends PropsWithChildren<any> {}
interface ProviderProp {
  user: User | null
  login: (params: LoginOrRegisterParam) => Promise<any>
  register: (params: LoginOrRegisterParam) => Promise<any>
  logout: () => void
}
const AuthContext = createContext<ProviderProp | undefined>(undefined)

export const AuthProvider: React.FC<AuthProviderProp> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null)
  const queryClient = useQueryClient()
  const {
    run,
    isLoading,
    isError,
    isIdle,
    data: user,
    setData: setUser,
    error
  } = useAsync<User | null>()
  const bootstrapUser = async () => {
    let user = null
    const token =  getToken()
    if (token) {
      const data = await run(http("me", { token }))
      user = data.user
    }
    return user
  }
  const providerProp: ProviderProp = {
    user,
    login: (params: LoginOrRegisterParam) =>
      login(params).then((user) => {
        console.log("user", user)
        setUser(user)
      }),
    register: (params: LoginOrRegisterParam) =>
      register(params).then((user) => setUser(user)),
    logout: () => logout().then(() => {
      setUser(null)
      // 清空所有缓存
      queryClient.clear()
    })
  }
  useMount(() => {
    // http('me', { token: getToken() }).then(({ user }) => setUser(user))
    bootstrapUser().then(setUser)
  })

  if (isLoading || isIdle) {
    return <FullPageLoading />
  }
  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  return (
    <AuthContext.Provider value={providerProp}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(
      `useAuth (useContext)必须在 <AuthContext.Provider /> 中使用`
    )
  }
  return context
}
