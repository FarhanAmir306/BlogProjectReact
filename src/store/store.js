import {configureStore} from '@reduxjs/toolkit';


const store = configureStore({
    reducer: {}, // Define your reducers here.
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Add any other middleware you want here.
})

export default store;