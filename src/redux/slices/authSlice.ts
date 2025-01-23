import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../constants/axiosApi";
import { AxiosError } from "axios";

interface AuthState {
  isAuthenticated: boolean;
  user: null | {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  loading: boolean;
  error: string | null;
}

interface ValidateSessionResponse {
  isAuthenticated: boolean;
}

interface ValidateSessionError {
  message?: string;
  isAuthenticated?: boolean;
}
type ValidateLoginParams = {
  email: string;
  password: string;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(validateSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateSession.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = payload.isAuthenticated;
      // state.user = action.payload.user;
    });
    builder.addCase(validateSession.rejected, (state, { payload }) => {
      state.error = payload?.message || null;
      state.user = null;
      state.isAuthenticated = payload?.isAuthenticated ?? false;
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = payload.isAuthenticated;
      // state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.error = payload?.message || null;
      state.user = null;
      state.isAuthenticated = payload?.isAuthenticated ?? false;
      state.loading = false;
    });
  },
});

export const validateSession = createAsyncThunk<
  ValidateSessionResponse, // Type of successful response
  void, // Type of argument to the thunk
  { rejectValue: ValidateSessionError } // Type of error
>("auth/validateSession", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosApi.get("/auth/session");

    console.log(response, "RESPONSE");

    return response.data;
  } catch (error) {
    const axiosError: AxiosError<ValidateSessionError> =
      error as AxiosError<ValidateSessionError>;

    return rejectWithValue(
      axiosError.response?.data || { message: "An unknown error occurred" }
    );
  }
});

export const login = createAsyncThunk<
  ValidateSessionResponse,
  ValidateLoginParams,
  { rejectValue: ValidateSessionError }
>("auth/login", async (user, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post<ValidateSessionResponse>(
      "/auth/login",
      user
    );
    return response.data;
  } catch (error) {
    const axiosError: AxiosError<ValidateSessionError> =
      error as AxiosError<ValidateSessionError>;

    return rejectWithValue(
      axiosError.response?.data || { message: "An unknown error occurred" }
    );
  }
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
