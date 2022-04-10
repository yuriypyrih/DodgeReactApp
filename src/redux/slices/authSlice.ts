import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getMeRequest,
  loginRequest,
  registerRequest,
} from "../../lib/api/http/requests/authentication";
import Cookies from "js-cookie";
import { RELICS_NAME } from "../../game/enum/relics_name";
import { API_LEVEL } from "../../Models/enum/API_LEVEL";
import {
  beatLevelRequest,
  unlockLevelRequest,
} from "../../lib/api/http/requests/game";
import { utilSetUser } from "../../utils/utilSetUser";

export const login = createAsyncThunk(
  "auth/login",
  async (params: { email: string; password: string }, thunkAPI) => {
    try {
      const { data } = await loginRequest(params.email, params.password);
      if (data && data.token && data.data.user) {
        Cookies.set("jwt_dodge", data.token);
        return { accessToken: data.token, user: data.data.user };
      } else {
        thunkAPI.dispatch(
          setStatusMsg({ statusMsg: "Something went wrong", msgIsError: true })
        );
        return thunkAPI.rejectWithValue("");
      }
    } catch (error) {
      if (error.response.data.message) {
        thunkAPI.dispatch(
          setStatusMsg({
            statusMsg: error.response.data.message,
            msgIsError: true,
          })
        );
      } else {
        thunkAPI.dispatch(
          setStatusMsg({ statusMsg: "Something went wrong", msgIsError: true })
        );
      }
      throw error;
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    params: {
      body: {
        name: string;
        email: string;
        password: string;
        passwordConfirm: string;
      };
      successCallback?: () => void;
    },
    thunkAPI
  ) => {
    try {
      await registerRequest(params.body);
      if (params.successCallback) params.successCallback();
    } catch (error) {
      if (
        error.response.data.error.code &&
        error.response.data.error.code === 11000
      ) {
        thunkAPI.dispatch(
          setStatusMsg({
            statusMsg: "There is already an account with this email",
            msgIsError: true,
          })
        );
        throw Error;
      }
      if (error.response.data.error.errors) {
        const {
          email = undefined,
          password = undefined,
          confirmPassword = undefined,
        } = error.response.data.error.errors;

        if (email) {
          thunkAPI.dispatch(
            setStatusMsg({ statusMsg: email.message, msgIsError: true })
          );
        } else if (password) {
          thunkAPI.dispatch(
            setStatusMsg({ statusMsg: password.message, msgIsError: true })
          );
        } else if (confirmPassword) {
          thunkAPI.dispatch(
            setStatusMsg({
              statusMsg: confirmPassword.message,
              msgIsError: true,
            })
          );
        } else {
          thunkAPI.dispatch(
            setStatusMsg({ statusMsg: "There was an error", msgIsError: true })
          );
        }
        throw Error;
      } else {
        thunkAPI.dispatch(
          setStatusMsg({ statusMsg: "There was an error", msgIsError: true })
        );
        throw Error;
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (params, thunkAPI) => {
    try {
      Cookies.remove("jwt_dodge");
      thunkAPI.dispatch({ type: "STORE_RESET" });
    } catch (error) {
      throw error;
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (params, thunkAPI) => {
    try {
      const { data } = await getMeRequest();
      if (data && data.document) {
        utilSetUser(data.document);
      } else {
        console.error("Something wrong with auth/getMe");
        return thunkAPI.rejectWithValue("");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const unlockLevel = createAsyncThunk(
  "auth/unlockLevel",
  async (params: { unlockLevel: string; cost: number }, thunkAPI) => {
    try {
      const { data } = await unlockLevelRequest(params);
      if (data && data.document) {
        utilSetUser(data.document);
      } else {
        console.error("Something wrong with auth/getMe");
        return thunkAPI.rejectWithValue("");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const beatLevel = createAsyncThunk(
  "auth/unlockLevel",
  async (
    params: { level: string; stars: number; unlockNext?: boolean },
    thunkAPI
  ) => {
    try {
      const { data } = await beatLevelRequest(params);
      if (data && data.document) {
        utilSetUser(data.document);
      } else {
        console.error("Something wrong with auth/getMe");
        return thunkAPI.rejectWithValue("");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

type User = {
  email: string;
  name: string;
  unlockedRelics: RELICS_NAME[];
  selectedRelic: RELICS_NAME | null;
  unlockedLevels: API_LEVEL[];
  stars: number;
};

type authSliceType = {
  accessToken: string | null;
  // refreshToken: string | null;
  user: User;
  meta: {
    loading: boolean;
    statusMsg: string;
    msgIsError: boolean;
  };
};

const initialState: authSliceType = {
  accessToken: null,
  // refreshToken: null,
  user: {
    email: "",
    name: "",
    unlockedRelics: [],
    selectedRelic: null,
    unlockedLevels: [],
    stars: 0,
  },
  meta: {
    loading: false,
    statusMsg: "",
    msgIsError: true,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatusMsg(
      state,
      action: PayloadAction<{ statusMsg: string; msgIsError: boolean }>
    ) {
      state.meta.statusMsg = action.payload.statusMsg;
      state.meta.msgIsError = action.payload.msgIsError;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.meta.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.meta.loading = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.accessToken = null;
      state.meta.loading = false;
    });
  },
});

export const { setToken, setStatusMsg, setUser } = authSlice.actions;
export default authSlice.reducer;
