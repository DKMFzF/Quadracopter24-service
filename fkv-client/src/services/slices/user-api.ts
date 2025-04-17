import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'http://localhost';

type AuthResponse = string;
export type UserData = {
  email: string;
  phone?: string;
  first_name: string;
  second_name: string;
  password: string;
};
type LoginCredentials = {
  email: string;
  password: string;
};
type ValidationError = {
  detail: Array<{
    loc: Array<string | number>;
    msg: string;
    type: string;
  }>;
};

interface AuthState {
  user: string | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: ValidationError | string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk<
  AuthResponse,
  UserData,
  { rejectValue: ValidationError }
>(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ detail: [{ loc: [], msg: 'An unknown error occurred', type: 'unknown' }] });
    }
  }
);

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: ValidationError }
>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ detail: [{ loc: [], msg: 'An unknown error occurred', type: 'unknown' }] });
    }
  }
);

export const getCurrentUser = createAsyncThunk<
  string,
  void,
  { rejectValue: ValidationError }
>(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<string>(`${API_BASE_URL}/auth/me`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ detail: [{ loc: [], msg: 'An unknown error occurred', type: 'unknown' }] });
    }
  }
);

export const logoutUser = createAsyncThunk<
  string,
  void,
  { rejectValue: ValidationError }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post<string>(`${API_BASE_URL}/auth/logout`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<ValidationError>;
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ detail: [{ loc: [], msg: 'An unknown error occurred', type: 'unknown' }] });
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Registration failed';
      })
      
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload;
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Login failed';
      })
      
      // Get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch user';
        localStorage.removeItem('token');
      })
      
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = null;
        state.token = null;
        localStorage.removeItem('token');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Logout failed';
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
