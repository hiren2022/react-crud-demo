import * as types from '../Actions/Types'

const initialState = {
    loading: false,
    postResult: null,
    postLikeResult:null,
    posts:[],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_POST_LOADING:
            return {...state, loading: action.loading};
        case types.SET_USER_STATE:
            return {...state, [action.state]: action.payload};
        case types.SET_POST_STATE_SUCCESS:
        case types.SET_POST_STATE_FAILURE:
            return {...state, postResult: action.payload, loading: action.loading};
        case types.GET_POST_STATE_SUCCESS:
        case types.GET_POST_STATE_FAILURE:
            return {...state, posts: action.payload, loading: action.loading};
        case types.SET_POST_LIKE_STATE_SUCCESS:
        case types.SET_POST_LIKE_STATE_FAILURE:
            return {...state, postLikeResult: action.payload, loading: action.loading};
        default:
            return state;
    }
}