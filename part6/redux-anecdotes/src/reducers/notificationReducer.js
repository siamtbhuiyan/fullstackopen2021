import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            state.pop()
            state.push(action.payload)
        },
        removeNotification(state) {
            state.pop()
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer