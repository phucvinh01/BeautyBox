import { combineReducers } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import proReducer from './proSlice'
import cateReducer from './cateSlice'
import brandReducer from './brandSlice'
import cartReducer from "./cartSlice"
import distributor from "./distributor"
import collection from "./collection"
import emp from './empSlice'
import order from './orderSlice'
import review from './reviewSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    product: proReducer,
    category: cateReducer,
    brand: brandReducer,
    cart: cartReducer,
    distributor: distributor,
    collection: collection,
    emp: emp,
    order: order,
    review: review
})

export default rootReducer