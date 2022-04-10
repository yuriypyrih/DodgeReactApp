import store from "../redux/store";
import Cookies from "js-cookie";
import { setToken } from "../redux/slices/authSlice";

const initialization = () => {
  // get redux store object
  const dispatch = store.dispatch;
  // retrieve the token from the available cookies
  const _token = Cookies.get("jwt_dodge");
  // retrieve the refreshToken from the available cookies
  // const _refreshToken = Cookies.get('agoraRefresh');
  // add token to the redux store
  if (_token) dispatch(setToken(_token));
  // add token to the redux store
  // if (_refreshToken) dispatch(setRefreshToken(_refreshToken));
};

export default initialization;
