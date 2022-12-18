import {
    put,
    call,
    all,
    takeLatest
} from 'redux-saga/effects';
import * as types from '../../Actions/Types'

import {httpAuth, httpGet, httpPost} from "../../Helper/api";
export function* getRequests({payload}) {
    try{
        yield put({ type: types.SET_LOADING,loading:true })
        let result = yield call(httpGet,`/request/${payload?.type}`)

        yield put({
            type: types.GET_REQUEST_STATE_SUCCESS,
            payload: result,
            state: payload?.type === 'user' ? 'userRequests':'requests',
            loading:false
        });
    }
    catch (e) {
        yield put({
            type: types.GET_REQUEST_STATE_FAILURE,
            payload: null,
            state: payload?.type === 'user' ? 'userRequests':'requests',
            loading:false
        });
    }

}
export function* getRequestsSaga() {
    yield all([takeLatest(types.GET_REQUEST_STATE, getRequests)]);
}