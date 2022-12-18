import {all} from "redux-saga/effects";
import {userRegisterSaga} from "./AuthSagas/userRegistrationSaga";
import {userLoginSaga} from "./AuthSagas/userLoginSaga";
import {gerAllUsersSaga} from "./AuthSagas/getAllUsersSaga";
import {userLogOutSaga} from "./AuthSagas/logoutSaga";
import {sendRequestSaga} from "./RequestSagas/sendRequestSaga";
import {getRequestsSaga} from "./RequestSagas/getRequestsSaga";
import {updateRequestSaga} from "./RequestSagas/updateRequestSaga";

export default function* root() {
    yield all([
        userRegisterSaga(),
        userLoginSaga(),
        gerAllUsersSaga(),
        userLogOutSaga(),
        sendRequestSaga(),
        getRequestsSaga(),
        updateRequestSaga()
    ]);
}