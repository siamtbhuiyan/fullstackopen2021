import { createSlice } from '@reduxjs/toolkit'


const initialState = ""

const filterSlice = createSlice ({
    name: "filter",
    initialState,
    reducers: {
        filteranecdotes(state, action) {
            return state.replace(state, action.payload)
        }
    }
})

export const { filteranecdotes } = filterSlice.actions
export default filterSlice.reducer