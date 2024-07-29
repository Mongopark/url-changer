import { LoginRequest } from './index.ts';

export type AuthField = {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  leftIcon: string;
  rightIcon: string;
};

export const loginFields: AuthField[] = [
  {
    id: 'email',
    label: 'EMAIL ADDRESS',
    placeholder: 'Enter email',
    type: 'email',
    leftIcon: 'fas fa-envelope',
    rightIcon: 'fas fa-envelope'
  },
  {
    id: 'password',
    label: 'CREATE PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  }
];

export const registerFields: AuthField[] = [
  {
    id: 'username',
    label: 'Name',
    placeholder: 'Input url name',
    type: 'text',
    leftIcon: 'fas fa-envelope',
    rightIcon: 'fas fa-envelope'
  },
  {
    id: 'web',
    label: 'Website',
    placeholder: 'https://placeholder.com',
    type: 'text',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  },
  {
    id: 'text',
    label: 'Description',
    placeholder: 'Input url description',
    type: 'text',
    leftIcon: 'fas fa-eye',
    rightIcon: 'fas fa-eye-slash'
  }
];


export const initialLoginFieldState: LoginRequest = {
  email: '',
  password: ''
};
