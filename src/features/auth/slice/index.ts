import { createAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthRequest, RegisterRequest, RegisterResponse, LoginResponse } from '../model';
import { useLoginMutation, useRegisterMutation } from '../../../app/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../hooks';

type AuthState = {
  token: string | null;
  isUserAuthenticated: boolean;
  userId: string | null;
};

const initialState: AuthState = {
  token: null,
  isUserAuthenticated: false,
  userId: null,
};

export function useAuthAction() {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();

  return {
    authenticate: async (request: AuthRequest, redirect: string | null = null) => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);

        const response: LoginResponse = await login(request).unwrap();
console.log("the response i want", response);
        dispatch(saveToken(response?.token));
        dispatch(setUserId(response?.id));
        dispatch(setUserAuthenticated(true));     
        console.log("problem response", response)   
        localStorage.setItem("token", JSON.stringify(response));

        // navigate(redirect ?? '/home');
        
        if (response?.success === true){
          toast(`${response.message}, welcome`, {
            type: 'success'
          });}
         else {
          toast(`${response.message}, An error Occured`, {
            type: 'error'
          });}
      } catch (e) {
        // @ts-expect-error e is an rtk query error
        toast(`${e.data.error}, Wrong input`, {
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    },



    registerUser: async (request: RegisterRequest, redirect: string | null = null) => {
      if (loading) {
        return;
      }

      try {
        setLoading(true);

        const response: RegisterResponse = await register(request).unwrap();

        if (response?.success === true){
          toast(`${response.message}, please proceed to Login`, {
          type: 'success'
        });}
         else {
          toast(`${response.message}, An error Occured`, {
            type: 'error'
          });}
      } catch (e) {
        // @ts-expect-error e is an rtk query error
        toast(`${e.data.error}, Wrong input`, {
          type: 'error'
        });
      } finally {
        setLoading(false);
      }
    },
    loading
  };
}

export const resetStore = createAction('RESET_STORE');

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  dispatch(resetStore());
  dispatch(setUserAuthenticated(false));
  dispatch(setUserId(""));
  toast('user Logged out Successfully', {
    type: 'success'
  });
  return null;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isUserAuthenticated = true;
    },
    setUserAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isUserAuthenticated = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.token = null;
      state.isUserAuthenticated = false;
    });
  },
  selectors: {
    isAuthenticated: (state: AuthState) => !!state.token
  }
});

export const { saveToken, setUserAuthenticated, setUserId } = authSlice.actions;
export const { isAuthenticated } = authSlice.selectors;

export default authSlice.reducer;
