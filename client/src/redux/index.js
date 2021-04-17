import { configureStore } from '@reduxjs/toolkit'
import mainPostReducer from './mainPostReducer'
import adminStudiosReducer from './adminStudiosReducer'

export default configureStore({
  reducer: {
    mainPost: mainPostReducer,
    adminStudios: adminStudiosReducer
  },
})
