import { apiAxios } from '../const';
import { LoginBody } from '../../types/login';
import { IUserProfile } from '../../types/user';

export const loginUser = async (loginBody: LoginBody) => {
  const response = await (await apiAxios.post('/auth/login', loginBody)).data;
  return response;
}