interface MarkProp {
  keywords?: string; // 关键词
  target?: string; // 处理的目标语句
  color?: string; // 高亮颜色
}
/**
 * 根据关键词高亮提示
 * @param param0 
 * @returns 
 */
export const Mark:  React.FC<MarkProp> = ({keywords = '', target = '', color = '#1890ff'}) => {
  if (!keywords.length) return <>{target}</>
  const reg = new RegExp(keywords, 'ig')
  const htmlString = target.replace(reg, `<span style="color: ${color};">$&</span>`)
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}