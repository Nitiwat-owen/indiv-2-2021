import { RegisterBody } from '../types/register';
import { ForgotPasswordBody } from '../types/forgot-password';
import { registerUser, resetPassword } from '../api/user/manage-profile';

export const userService = {
    register,
    forgotPassword
};

async function register(userDetails: RegisterBody) {
    const resp = await registerUser(userDetails);
    return resp;
}

async function forgotPassword(userDetails: ForgotPasswordBody) {
    const resp = await resetPassword(userDetails);
    return resp;
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