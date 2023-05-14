import {apiClient} from './config';

export const loginUser = async (payload) => {
  console.log(payload);
  const res = await apiClient.post('user/auth', payload);
  console.log(res);
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.get('user/deleteCookie');
  return res;
};

export const registerUser = async (payload) => {
  const res = await apiClient.post('user/register', payload);
  console.log("HEllo")
  return res;
};
