import anecodoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
    reducer: anecodoteReducer
})
console.log(store.getState())

export default store;