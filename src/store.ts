import { configureStore } from '@reduxjs/toolkit'
import darkReducer from './darkSlice'
import itemsReducer from './itemsSlice'

export const store = configureStore({
  reducer: {
    dark: darkReducer,
    items:itemsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch