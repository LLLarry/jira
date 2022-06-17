import { Rate } from "antd"
import { useCallback, useMemo } from "react"
// 获取Rate props
type RateProp = React.ComponentProps<typeof Rate>
interface PinProp extends Omit<RateProp, "onChange"> {
  checked: boolean
  onChange?: (checked: PinProp["checked"]) => void
}
export const Pin: React.FC<PinProp> = ({ checked, onChange }) => {
  const value = useMemo(() => Number(checked), [checked])
  const handleChange = useCallback((v: number) => {
    onChange?.(!!v)
  }, [])
  return <Rate count={1} value={value} onChange={handleChange} />
}
