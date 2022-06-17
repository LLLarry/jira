import { useMemo } from "react"
import { useQueryParams } from "utils"

export const useProjectSearchParam = () => {
  const [param, setParam] = useQueryParams(["name", "personId"])
  const { name, personId } = param
  const projectParam = useMemo(() => {
    return {
      ...param,
      personId: Number(param.personId) || undefined
    }
  }, [name, personId])

  return [projectParam, setParam] as const
}