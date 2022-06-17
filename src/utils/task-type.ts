import { useQuery } from "react-query"
import { TaskType } from "type"
import { useHttp } from "./http"

export const useTaskTypes = () => {
    const client = useHttp()
    return useQuery<TaskType[], Error>(['taskTypes'], () => client('taskTypes'))
}
