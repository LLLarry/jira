module.exports = (req, res, next) => {
  const { url } = req
  // 登录接口
  if(url === '/login') {
    const { username, password } = req.body
    if (username === 'jira' && password === '111') {
      return res.status(200).json({
        username,
        password
      })
    } else {
      return res.status(500).json({
        message: '用户名或密码错误'
      })
    }
  }
  next()
}