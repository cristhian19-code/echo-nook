import { configureStore } from "@reduxjs/toolkit";

import postsReducer from './PostsSlice';
import usersReducer from './UsersSlice';


// Slices

const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: usersReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
