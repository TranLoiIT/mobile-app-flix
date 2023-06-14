import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DATA_USER } from '../constants/key';

// import {BASE_URL} from 'react-native-dotenv';
// get the port of the computer
const PORT = '192.168.3.222'
const BASE_URL = `http://${PORT}:9000/api/`;
export const URL_IMAGE = `http://${PORT}:9000/`;

console.log(BASE_URL);

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
  withCredentials: true,
  timeout: 15000,
});

// Add a request interceptor
request.interceptors.request.use(
  async config => {
    const dataUser = await AsyncStorage.getItem(DATA_USER);
    if (dataUser) {
      const data = JSON.parse(dataUser);
      // console.log('data', data);
      if (data?.token !== '') {
        config.headers['Authorization'] = `Bearer ${data.token}`;
      }
    }
    config.headers['Content-Type'] = 'application/json'

    return config;
  },
  error => {
    Promise.reject(error);
  },
);

// Add a response interceptor
request.interceptors.response.use(
  response => {
    console.log('response', response)
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  },
);

const apiClient = {
  get: (url, data) => {
    console.log('url get: ', url);
    return request({
      method: 'get',
      url: url,
      params: data,
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
  post: (url, data) => {
    console.log('post ', {url}, {data});
    return request({
      method: 'post',
      url: url,
      data: data,
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
  patch: (url, data) => {
    console.log('patch ', {url}, {data});
    return request({
      method: 'patch',
      url: url,
      data: data,
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
  delete: (url, data) => {
    return request({
      method: 'delete',
      url: url,
      data: data,
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
  put: (url, data) => {
    return request({
      method: 'put',
      url: url,
      data: data,
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        throw err;
      });
  },
};

export {apiClient};
