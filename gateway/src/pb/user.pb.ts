import { Observable } from 'rxjs';
import { BaseServiceClient } from './base.pb';

export const protobufPackage = 'user';
export const USER_SERVICE_NAME = 'UserService';

export interface User {
  id: number;
  email: number;
  password: number;
}

export interface RegisterResponse {
  status: number;
  error: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  error: string[];
  token: string;
}

export interface ValidateRequest {
  token: string;
}

export interface ValidateResponse {
  status: number;
  error: string[];
  userId: number;
}

export const AUTH_PACKAGE_NAME = 'auth';

export interface UserServiceClient extends BaseServiceClient<User> {}
