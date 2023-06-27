import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    login: "",
    email: "",
    avatar: "",
    uid: null,
    isLogin: false,
  },
  reducers: {},
    extraReducers: (builder) => {
        builder
        
    },
});

export const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        
    }
})

export const userReducer = userSlice.reducer;
export const postReducer = postsSlice.reducer;