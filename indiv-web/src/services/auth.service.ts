import jwt_decode from 'jwt-decode';
import { loginUser } from '../api/auth/login';

export const authService = {
    login,
    logout
};

async function login(username: string, password: string) {
    const resp = await loginUser({username, password});
    if (resp.result) {
        // const token = jwt_decode(resp.data.authToken);
        localStorage.setItem('authToken', resp.data.authToken);
    }
    return resp;
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('authToken');
}

function handleResponse(response) {
    console.log('>>>> response: ', response);
    // return response.text().then(text => {
    //     const data = text && JSON.parse(text);
    //     if (!response.ok) {
    //         if (response.status === 401) {
    //             // auto logout if 401 response returned from api
    //             logout();
    //             location.reload(true);
    //         }

    //         const error = (data && data.message) || response.statusText;
    //         return Promise.reject(error);
    //     }

    //     return data;
    // });
}