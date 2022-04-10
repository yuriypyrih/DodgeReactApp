import axios from "axios";
import Cookies from "js-cookie";
// import { refreshTokenRequest } from './requests/authentication';
// import { setToken, setRefreshToken } from '../../../redux/slices/authSlice';
import { dispatch } from "../../../index";

//REACT_APP_API_URL=http://127.0.0.1:3005/api/v1

const URL = process.env["REACT_APP_API_URL"];

console.log("URL", URL);
// const CLIENT_ID = process.env["REACT_APP_CLIENT_ID"];
// const CLIENT_SECRET = process.env["REACT_APP_CLIENT_SECRET"];

const axiosInstance = axios.create({
  baseURL: URL,
  timeoutErrorMessage: "Request took long to complete, times up!",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) {
      config.headers = {};
    }

    config.headers.referrerPolicy = "no-referrer";
    const token = Cookies.get("jwt_dodge"); //store.getState().authentication.accessToken; //connect with redux store
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       (error.response.status === 401 || error.message.status === 403) &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       // Renew access token
//       const _refreshToken = Cookies.get("agoraRefresh");
//       if (_refreshToken) {
//         try {
//           const { accessToken, refreshToken } = await refreshTokenRequest({
//             refreshToken: _refreshToken,
//           });
//           axios.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${accessToken}`;
//           // Set new access token
//           Cookies.set("agoraTokenQuint", accessToken);
//           Cookies.set("agoraRefresh", refreshToken);
//           dispatch(setToken(accessToken));
//           dispatch(setRefreshToken(refreshToken));
//           return axiosInstance(originalRequest);
//         } catch (error) {
//           // Remove old token
//           Cookies.remove("agoraTokenQuint");
//           Cookies.remove("agoraRefresh");
//           dispatch(setToken(null));
//           dispatch(setRefreshToken(null));
//           throw error;
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// eslint-disable-next-line
export const postRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.post(endpoint, { ...body }, {});
};

// eslint-disable-next-line
export const putRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.put(endpoint, { ...body }, {});
};

// eslint-disable-next-line
export const getRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.get(endpoint, { params });
};

// eslint-disable-next-line
export const patchRequest = (endpoint: string, body?: any): Promise<any> => {
  return axiosInstance.patch(endpoint, { ...body });
};

// eslint-disable-next-line
export const deleteRequest = (endpoint: string, params?: any): Promise<any> => {
  return axiosInstance.delete(endpoint, { params });
};
