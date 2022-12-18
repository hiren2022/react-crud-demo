import {
    put,
    call,
    all,
    takeLatest
} from 'redux-saga/effects'
import * as types from '../../Actions/Types'

import {httpPost} from "../../Helper/api";
import {removeAccessToken} from "../../Helper/TokenHandler";
export function* userLogOut({payload}) {
    try{
        yield put({ type: types.SET_LOADING,loading:false })
        let request = {url:'/user/logout',body:{payload}}
        let result = yield call(httpPost,request)
        if(result && result.success){
            removeAccessToken();
            window.location.href = '/login';
        }
        yield put({
            type: types.USER_LOGOUT_SUCCESS,
            payload: result,
            loading:false
        });
    }
    catch (e) {
        yield put({
            type: types.USER_LOGOUT_FAILURE,
            payload: null,
            loading:false
        });
    }

}
export function* userLogOutSaga() {
    yield all([takeLatest(types.USER_LOGOUT_STATE, userLogOut)]);
}