import styled from "@emotion/styled"
import { Row } from "components/lib/row"
import { useAuth } from "context/auth-context"
import { ProjectListScreens } from "screens/project-list"
import undraw_font_re_efri from "assets/svgs/undraw_font_re_efri.svg"
import { Button, Dropdown, Menu, Space } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { ItemType } from "antd/lib/menu/hooks/useItems"
import { Navigate, Route, Routes } from "react-router"
import { ProjectScreen } from "screens/project"
import { resetRoute } from "utils"
import { useState } from "react"
import { ProjectModal } from "screens/project-list/project-modal"
import { ProjectPopover } from "screens/project-list/project-popover"
import { useDispatch } from 'react-redux'
import { closeprojectModal } from "screens/project-list/project-list-slice"
import { UserPopover } from "screens/project-list/user-popover"
/**
 * 已授权页面
 * @returns
 */
export const AuthenticatedApp = () => {
  const dispatch = useDispatch()
  // 创建项目按钮
  return (
    <>
      <Container>
        <PageHeader />
        <Main>
          <Routes>
            <Route
              path="/project"
              element={<ProjectListScreens />}
            />
            <Route path="/project/:projectId/*" element={<ProjectScreen />} />
            {/* 上面匹配不到，重定向到/project */}
            <Route path="*" element={<Navigate to="/project" />} />
          </Routes>
        </Main>
        <Footer>
            <div>
              @2021 | jira
            </div>
        </Footer>
        <ProjectModal />
      </Container>
    </>
  )
}
interface PageHeaderProp {
}
const PageHeader: React.FC<PageHeaderProp> = () => {
  const { logout, user } = useAuth()
  const logoutFn: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault()
    logout()
  }
  return (
    <Header between={true}>
      <HeaderLeft gap={2}>
        <div style={{ padding: "0 20px" }} onClick={resetRoute}>
          <Logo />
        </div>
        <ProjectPopover />
        <UserPopover />
      </HeaderLeft>
      <div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="layout">
                <a onClick={logoutFn}>退出登录</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              Hi，{user?.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    "header"
    "main"
    "footer";
  height: 100vh;
  width: 100%;
`
const Header = styled(Row)`
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
`
const HeaderLeft = styled(Row)``
const Main = styled.main`
  display: flex;
  width: 100vw;
`

const Footer = styled.footer`
  background-color: rgba(244,245,247, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
`
const Logo = styled.div`
  width: 5rem;
  height: 5rem;
  background-image: url(${undraw_font_re_efri});
  background-size: 4rem auto;
  background-position: center;
  background-repeat: no-repeat;
`
