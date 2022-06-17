import { useQuery } from "react-query"
import { User } from "type"
import { useMount } from "utils"
import { useHttp } from "./http"
import useAsync from "./use-async"
// const baseURl = process.env.REACT_APP_API_URL

const useUsers = () => {
    // const { run, ...result } = useAsync<User[]>()
    const client = useHttp()
    const result = useQuery<User[], Error>('users', () => client(`users`))
    return result
}

export default useUsers