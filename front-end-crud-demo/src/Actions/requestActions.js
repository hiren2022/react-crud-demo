import * as types from "./Types";

export const sendRequest = (payload) =>{
    return {
        type: types.SEND_REQUEST_STATE,
        payload
    }
}

export const getRequests = (payload) =>{
    return {
        type: types.GET_REQUEST_STATE,
        payload
    }
}

export const setRequest = (payload) =>{
    return {
        type: types.SET_REQUEST_STATE,
        payload:null
    }
}

export const updateRequest = (payload) =>{
    return {
        type: types.UPDATE_REQUEST_STATE,
        payload
    }
}