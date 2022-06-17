import styled from "@emotion/styled"
import { Drop } from "components/drop"
import { useKanbans } from "utils/kanban"
import { CreateKanban } from "./create-kanban"
import { EditTaskModal } from "./edit-task-modal"
import { KanbanColumn } from "./kanban-column"
import { SearchPanel } from "./search-panel"
import { useKanbanSearchParams, useProjectInUrl, useSortList } from "./util"

export const KanbanScreen = () => {
    // 通过获取地址栏中projectId来获取对应project数据
    const { data: project } = useProjectInUrl()
    const { data: kanbans = [] } = useKanbans(useKanbanSearchParams())
    const updateSort = useSortList()
    return (
        <ScreenContainer>
            <h3>{project?.name}看板</h3>
            <SearchPanel />
            <ColumnContainer>
                <Drop
                    droppableId={'kanban'}
                    direction={'horizontal'}
                    type={'COLUMN'}
                    style={{ display: 'flex', flex: 1 }}
                    list={kanbans}
                    render={(kanban) => KanbanColumn({ kanban })}
                    onDragEnd={(list, droppableId, result) => {
                        updateSort(result)
                    }}
                />
                {/* {
                    kanbans?.map(kanban => (
                        <KanbanColumn kanban={kanban} key={kanban.id} />
                    ))
                } */}
                <CreateKanban />
            </ColumnContainer>
            {/* 编辑task */}
            <EditTaskModal />
        </ScreenContainer>
    )
}  
export const ScreenContainer = styled.div`
    padding: 3.2rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    overflow: hidden;
`
const ColumnContainer = styled.div`
    display: flex;
    flex: 1;
    overflow-x: auto;
`
