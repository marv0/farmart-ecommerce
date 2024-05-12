import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './features/CartSlice'

export const store = configureStore({
    reducer:{
        cart:cartSlice
    }
})