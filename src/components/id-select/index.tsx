import { Select } from "antd"
// 获取select props类型， 方法如下：
// 1、通过React.ComponentProps获取组件的props属性
type SelectProp = React.ComponentProps<typeof Select>
// 2、使用util-type提供的Parameters，获取函数的参数
// type SelectProp = Parameters<typeof Select>[0]
// 3、使用antd到处的SelectProps
interface IdSelectProp
  extends Omit<SelectProp, "value" | "onChange" | "options"> {
  value?: number | string | undefined | null
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options: { name: string; id: number }[]
}
/**
 * value 可以传多种类型
 * onChange只会回调 number | undefined 类型的数据
 * 当 isNaN(Number(value)) 为true时，代表选择默认类型
 * 当选择默认类型时， onChange回调为undefined
 * @param param0
 * @returns
 */
export const IdSelect: React.FC<IdSelectProp> = ({
  value,
  onChange,
  defaultOptionName,
  options,
  ...config
}) => {
  return (
    <Select
      value={
        defaultOptionName && options.length <= 0
          ? defaultOptionName
          : toNumber(value)
      }
      onChange={(v) => onChange?.(toNumber(v) || undefined)}
      {...config}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

/**
 * 转换为number
 * @param v NaN 时返回 0,其他转化为数字
 * @returns
 */
const toNumber = (v: unknown) => (isNaN(Number(v)) ? 0 : Number(v))
