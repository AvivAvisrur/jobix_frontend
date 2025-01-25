import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../../constants/axiosApi";
import { AxiosError } from "axios";
import { GeneralError, ValidationError } from "../../constants/globalTypes";

type AuthState = {
  user: null | {
    id: number;
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  loading: boolean;
  error: { field?: string; message: string } | null;
};

type UserSignUp = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
type UserResponse = Omit<UserSignUp, "password">;

type ServerErrorResponse = ValidationError | GeneralError;
const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.error = null;
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.error = payload || null;
      state.user = null;
      state.loading = false;
    });
  },
});

export const signUpUser = createAsyncThunk<
  UserResponse & { id: number }, // Type of successful response
  UserSignUp, // Type of argument to the thunk
  { rejectValue: ServerErrorResponse } // Type of error
>("auth/sign_up", async (user, { rejectWithValue }) => {
  try {
    const response = await axiosApi.post("/auth/sign_up", user);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ServerErrorResponse>;

    return rejectWithValue(
      axiosError.response?.data || { message: "An unknown error occurred" }
    );
  }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
