import {
    put,
    call,
    all,
    takeLatest
} from 'redux-saga/effects';
import * as types from '../../Actions/Types'

import {httpAuth, httpGet, httpPost} from "../../Helper/api";
export function* getFollowers({payload}) {
    try{
        yield put({ type: types.SET_LOADING,loading:true })
        let result = yield call(httpGet,payload?.state === 'followers' ? `/follower/getFollowers`:`/follower/getFollowings`)

        yield put({
            type: types.GET_FOLLOWERS_STATE_SUCCESS,
            payload: result,
            state: payload?.state,
            loading:false
        });
    }
    catch (e) {
        yield put({
            type: types.GET_FOLLOWERS_STATE_FAILURE,
            payload: null,
            state: payload?.state,
            loading:false
        });
    }

}
export function* getFollowersSaga() {
    yield all([takeLatest(types.GET_FOLLOWERS_STATE, getFollowers)]);
}