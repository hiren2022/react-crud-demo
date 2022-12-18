import * as types from '../Actions/Types'

const initialState = {
    loading: false,
    requestResult: null,
    requests: [],
    userRequests:[],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {...state, loading: action.loading};
        case types.SEND_REQUEST_STATE_SUCCESS:
        case types.SEND_REQUEST_STATE_FAILURE:
            return {...state, requestResult: action.payload, loading: action.loading};
        case types.GET_REQUEST_STATE_SUCCESS:
        case types.GET_REQUEST_STATE_FAILURE:
            return {...state, [action.state]: action.payload, loading: action.loading};
        case types.SET_REQUEST_STATE:
            return {...state, requestResult: action.payload};
        default:
            return state;
    }
}