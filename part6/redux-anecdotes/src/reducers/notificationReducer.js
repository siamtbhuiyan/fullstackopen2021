import { createSlice } from "@reduxjs/toolkit";

const initialState = ""

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setNotification(state, action) {
            return state.replace(state, action.payload)
        },
        removeNotification(state) {
            return state.replace(state, "")
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const showNotification = (content, time) => {
    return async dispatch => {
        dispatch(setNotification(content))
        setTimeout(() => dispatch(removeNotification()), time*1000)
    }
}

export default notificationSlice.reducer