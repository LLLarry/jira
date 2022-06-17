import { IdSelect } from "components/id-select"
import React from "react"
import useUser from "utils/user"
export const UserSelect: React.FC<
  Omit<React.ComponentProps<typeof IdSelect>, "options">
> = (props) => {
  const { data: users } = useUser()
  return <IdSelect options={users || []} {...props}></IdSelect>
}
