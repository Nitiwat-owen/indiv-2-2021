import { apiAxios } from '../const';
import { RegisterBody } from '../../types/register';
import { ForgotPasswordBody } from '../../types/forgot-password';

export const registerUser = async (registerBody: RegisterBody) => {
    const response = await (
      await apiAxios.post('/users/register', registerBody)
    ).data;
    return response;
}

export const resetPassword = async (userDetails: ForgotPasswordBody) => {
    const response = await (
      await apiAxios.post('/users/forgotPassword', userDetails)
    ).data;
    return response;
}