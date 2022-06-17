import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
interface State {
  projectModalOpen: boolean;
}
const initialState: State = {
  projectModalOpen: false
}
const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    // toggle (state, action: PayloadAction<boolean>) {
    //   state.projectModalOpen = action.payload
    // },
    openprojectModal (state) {
      state.projectModalOpen = true
    },
    closeprojectModal (state) {
      state.projectModalOpen = false
    },
  }
})
// 导出方法
export const { openprojectModal, closeprojectModal } = projectListSlice.actions
// 导出获取参数函数
export const selectProjectModalOpen = (state: RootState) => state.project.projectModalOpen
// 导出reducer
export default projectListSlice.reducer