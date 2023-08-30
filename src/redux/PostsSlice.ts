import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post } from './interfaces';
import { axiosInstance } from './../configs/axios';

import { createPostBack } from './PostsThunk';
import { RootState } from './store';

export const getPosts = createAsyncThunk(
    "posts/getPostsBack",
    async (creator: string | null = null) => {
        const url: string = `posts/${creator ? `?creator=${creator}` : ''}`;
        const { data } = await axiosInstance(url)
        return data;
    }
)

export const getMyPosts = createAsyncThunk(
    "posts/getMyPostsBack",
    async (creator: string) => {
        const url: string = `posts/my-posts?creator=${creator}`;
        const { data } = await axiosInstance(url)

        return data;
    }
)

export const getPost = createAsyncThunk(
    "posts/getPostBack",
    async (id: string) => {
        const { data } = await axiosInstance(`posts/${id}`)
        return data;
    }
)

export const createPost = createAsyncThunk(
    "posts/createPostBack",
    async (post: Post) => {
        const { data } = await createPostBack(post);
        return data;
    }
)

export const likePost = createAsyncThunk(
    "posts/likePostBack",
    async (id: string) => {
        const { data } = await axiosInstance.put(`posts/${id}/likePost`);
        return data;
    }
)

export const deletePost = createAsyncThunk(
    "posts/deletePostBack",
    async (id: string) => {
        const { data } = await axiosInstance.delete(`posts/${id}`);
        return data;
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        post: null,
        dialogDelete: {
            open: false,
            id: null
        },
    },
    reducers: {
        toggleDialog(state: RootState, action: PayloadAction) {
            state.dialogDelete = action.payload
        }
    },
    extraReducers: {
        // Creacion de post
        [createPost.fulfilled]: (state, action) => {
            state.loading = false;
        },
        [createPost.pending]: (state) => {
            state.loading = true;
        },
        [createPost.rejected]: (state) => {
            state.loading = false;
        },

        // Traer lista de mis posts
        [getMyPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        [getMyPosts.pending]: (state) => {
            state.loading = true;
        },
        [getMyPosts.rejected]: (state) => {
            state.posts = null;
            state.loading = false;
        },

        // Traer lista de posts
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        [getPosts.pending]: (state) => {
            state.loading = true;
        },
        [getPosts.rejected]: (state) => {
            state.posts = null;
            state.loading = false;
        },

        // Traer post por id
        [getPost.fulfilled]: (state: RootState, action) => {
            state.post = action.payload;
            state.loading = false;
        },
        [getPost.pending]: (state) => {
            state.loading = true;
        },
        [getPost.rejected]: (state) => {
            state.post = null;
            state.loading = false;
        },

        // Like post
        [likePost.fulfilled]: (state: RootState, action) => {
            const newPost = action.payload;
            state.posts = state.posts.map((post) => post._id === newPost._id ? { ...post, likeCount: newPost.likeCount } : post)
            state.loadingLike = false;
        },

        // Delete post
        [deletePost.fulfilled]: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
            state.dialogDelete = {
                open: false,
                id: null
            }
        },
    }
})

export const { toggleDialog } = postsSlice.actions

export default postsSlice.reducer