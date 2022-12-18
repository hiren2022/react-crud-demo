import jwt_decode from 'jwt-decode';
export const getAccessToken = () => {
    let accToken = localStorage.getItem("accessToken");
    return accToken ? accToken : {};
};

export const setAccessToken = (data) => {
    localStorage.setItem("accessToken", data);
};

export const removeAccessToken = () => {
    localStorage.removeItem("accessToken");
};
export const getTokenObject = () => {
    let decoded;
    let token = getAccessToken();
    var tokenObj = JSON.stringify(token);
    if (token && token !== '{}') {
        decoded = jwt_decode(token);
    }
    return decoded;
};