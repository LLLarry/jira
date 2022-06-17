import { configureStore } from '@reduxjs/toolkit'
import projectListReducer from 'screens/project-list/project-list-slice'


const store = configureStore({
  reducer: {
    project: projectListReducer
  }
})

export default store

export type AppDispatch  = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>