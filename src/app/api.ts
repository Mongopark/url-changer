import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { isDev } from './environment';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, ShortnerRequest, CreateProductRequest, ChangePasswordRequest } from '../features/auth/model';
import { RootState } from './store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    console.log('Getting token', token);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithLogging: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  if (isDev()) {
    console.log('Request:', args);
  }
  const result = await baseQuery(args, api, extraOptions);
  if (isDev()) {
    console.log('Response:', result);
  }
  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithLogging,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: 'signin',
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (data) => ({
        url: 'signup',
        method: 'POST',
        body: data
      })
    }),
    getMe: builder.query<LoginResponse,void>({
      query: () => ({
        url: `getme`,
        method: 'GET',
      }),
    }),
    getUrls: builder.query<LoginResponse, void>({
      query: () => ({
        url: `geturls`,
        method: 'GET',
      }),
    }),
    urlShortner: builder.mutation<LoginResponse, ShortnerRequest>({
      query: (data) => ({
        url: 'shorturl',
        method: 'POST',
        body: data
      })
    }),
    createProduct: builder.mutation<LoginResponse, ShortnerRequest>({
      query: (data) => ({
        url: 'product/create',
        method: 'POST',
        body: data
      })
    }),    
    editProfile: builder.mutation<LoginResponse, CreateProductRequest>({
      query: (data) => ({
        url: 'profile/edit',
        method: 'POST',
        body: data
      })
    }),
    changePassword: builder.mutation<LoginResponse, ChangePasswordRequest>({
      query: (data) => ({
        url: 'password/edit',
        method: 'POST',
        body: data
      })
    }),
  })
});

export const { useLoginMutation, useRegisterMutation, useGetUrlsQuery, useEditProfileMutation, useCreateProductMutation, useGetMeQuery, useUrlShortnerMutation, useChangePasswordMutation } = api;
