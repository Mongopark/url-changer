import { InferType } from 'yup';
import { loginValidator, registerValidator } from './validators.ts';

export interface LoginRequest extends InferType<typeof loginValidator> {}
export interface RegisterRequest extends InferType<typeof registerValidator> {}

export interface LoginResponse {
  success?: boolean;
  message?: string;
  token: string;
    id: string;
}


export interface RegisterResponse {
  token: string;
  message: string;
  success: boolean;
}


export type RegRequest = RegisterRequest & {
  [key: string]: string;
};

export type AuthRequest = LoginRequest & {
  [key: string]: string;
};


export interface ShortnerRequest {
  name: string;
      url: string;
      description: string;
}


export interface CreateProductRequest {
  name: string;
      description: any;
      price: string;
      image: string | ArrayBuffer | null;
}


export interface ChangePasswordRequest {
  oldPassword: string;
      newPassword: string;
}



export type AuthResponse = LoginResponse & {
  [key: string]: unknown;
};
