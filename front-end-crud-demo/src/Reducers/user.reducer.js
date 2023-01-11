import * as types from '../Actions/Types'

const initialState = {
    loading: false,
    user: {
        "name": "Hiren Bhuva",
        "password": "Hiren@1722",
        "userName": "hiren_1722",
        "birthDate": "2000-02-17T22:13",
        "email": "hirenbhuva@gmail.com",
        "contact": "1234456654",
        "gender": "Male",
        "hobby": ["Programming", "Reading", "Gaming", "Riding"],
        "state": "Gujarat",
        status: false,
    },
    profile: null,
    userResult: null,
    users: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LOADING:
            return {...state, loading: action.loading};
        case types.SET_USER_STATE:
            return {...state, [action.state]: action.payload};
        case types.SAVE_USER_STATE_SUCCESS:
        case types.SAVE_USER_STATE_FAILURE:
        case types.USER_LOGIN_SUCCESS:
        case types.USER_LOGIN_FAILURE:
            return {...state, userResult: action.payload, loading: action.loading};
        case types.GET_USER_STATE_SUCCESS:
        case types.GET_USER_STATE_FAILURE:
            return {...state, users: action.payload, loading: action.loading};
        case types.GET_PROFILE_SUCCESS:
        case types.GET_PROFILE_FAILURE:
            return {...state, profile: action.payload, loading: action.loading};
        default:
            return state;
    }
}