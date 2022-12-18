// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from 'redux'

// Reducers
import user from './user.reducer'
import request from './request.reducer'

export default combineReducers({
    userData:user,
    requestData:request
    // Here you can registering another reducers.
})