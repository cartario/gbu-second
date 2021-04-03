import { configureStore } from '@reduxjs/toolkit'
import mainPostReducer from './mainPostReducer'

export default configureStore({
  reducer: {
    mainPost: mainPostReducer
  },
})
