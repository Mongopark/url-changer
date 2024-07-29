import { LoginRequest, RegisterRequest } from './index.ts';

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
    leftIcon: 'far fa-envelope',
    rightIcon: 'far fa-envelope'
  },
  {
    id: 'password',
    label: 'CREATE PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'far fa-eye',
    rightIcon: 'far fa-eye-slash'
  }
];

export const registerFields: AuthField[] = [
  {
    id: 'name',
    label: 'FullName',
    placeholder: 'Enter Full Name',
    type: 'name',
    leftIcon: 'far fa-envelope',
    rightIcon: 'far fa-envelope'
  },
  {
    id: 'email',
    label: 'EMAIL ADDRESS',
    placeholder: 'Enter email',
    type: 'email',
    leftIcon: 'far fa-envelope',
    rightIcon: 'far fa-envelope'
  },
  {
    id: 'password',
    label: 'CREATE PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'far fa-eye',
    rightIcon: 'far fa-eye-slash'
  },
  {
    id: 'confirm_password',
    label: 'CONFIRM PASSWORD',
    placeholder: 'Enter password',
    type: 'password',
    leftIcon: 'far fa-eye',
    rightIcon: 'far fa-eye-slash'
  }
];


export const initialLoginFieldState: LoginRequest = {
  email: '',
  password: ''
};

export const initialRegisterFieldState: RegisterRequest = {
  name: '',
  email: '',
  password: ''
};
