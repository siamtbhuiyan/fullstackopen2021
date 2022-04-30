import anecdoteReducer from './reducers/anecdoteReducer'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';


const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer,
        filter: filterReducer
    }
})

store.subscribe(() => console.log(store.getState()))

export default store;