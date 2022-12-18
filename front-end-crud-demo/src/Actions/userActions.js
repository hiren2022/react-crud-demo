import * as types from "./Types";

export const registerUser = (payload) =>{
    return {
        type: types.SAVE_USER_STATE,
        payload
    }
}
export const setUserData = (state,payload) =>{
    return {
        type: types.SET_USER_STATE,
        state: state,
        payload:payload
    }
}

export const loginUser = (payload) =>{
    return {
        type: types.USER_LOGIN_STATE,
        payload
    }
}

export const getAllUsers = (payload) =>{
    return {
        type: types.GET_USER_STATE,
        payload
    }
}

export const logout = (payload) =>{
    return {
        type: types.USER_LOGOUT_STATE,
        payload
    }
}