import styled from "@emotion/styled"
import { Menu } from "antd"
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { EpicScreen } from "screens/epic"
import { KanbanScreen } from "screens/kanban"
const useSelectingPath = () => {
    const { pathname } = useLocation()
    const paths = pathname.split(/\//g)
    return [paths[paths.length - 1]]
}
export const ProjectScreen = () => {
    const selectPaths = useSelectingPath()
    const navigate = useNavigate()
    console.log(selectPaths)
    return (
        <ProjectScreenCom>
            <Aslide>
                <Menu selectedKeys={selectPaths} items={[
                    {
                        label: '看板',
                        key: 'kanban',
                        onClick () {
                            navigate('kanban')
                        }
                    },
                    {
                        label: '任务组',
                        key: 'epic',
                        onClick () {
                            navigate('epic')
                        }
                    }
                ]} />
            </Aslide>
            
            <Routes>
                <Route path="/kanban" element={<KanbanScreen />}></Route>
                <Route path="/epic" element={<EpicScreen />}></Route>
                {/* 默认打开看板 */}
                <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace />}></Route>
            </Routes>
        </ProjectScreenCom>
    )
}
const ProjectScreenCom = styled.div`
    display: grid;
    grid-template-columns: 16rem 1fr;
    width: 100%;
`
const Aslide = styled.div`
    /* display: flex; */
    height: 100%;
    &>ul {
        height: 100%;
    }
`