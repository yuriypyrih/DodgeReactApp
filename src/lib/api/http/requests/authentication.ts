import { postRequest, getRequest } from "../index";

export const getMeRequest = () => {
  return getRequest("/users/me");
};

export const loginRequest = (email: string, password: string) => {
  return postRequest("/users/login", { email, password });
};

export const registerRequest = (body: {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  return postRequest("/users/signup", body);
};
