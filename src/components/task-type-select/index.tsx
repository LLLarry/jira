import { Select } from "antd"
import { IdSelect } from "components/id-select"
import { useTaskTypes } from "utils/task-type"
export const TaskTypeSelect: React.FC<
  Omit<React.ComponentProps<typeof IdSelect>, "options">
> = (props) => {
  const { data: taskTypes } = useTaskTypes()
  return <IdSelect options={taskTypes || []} {...props}></IdSelect>
}
