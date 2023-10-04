import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../components/counter/counterSlice'
import configurationReducer from './slices/configurationSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        configuration: configurationReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>

export default store
