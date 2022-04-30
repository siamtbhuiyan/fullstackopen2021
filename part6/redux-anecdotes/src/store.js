import anecodoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer';


const store = configureStore({
    reducer: {
        anecodotes: anecodoteReducer,
        notifications: notificationReducer
    }
})
console.log(store.getState())

export default store;