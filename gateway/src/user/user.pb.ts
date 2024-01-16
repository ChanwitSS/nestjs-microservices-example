import { Observable } from 'rxjs';

export const protobufPackage = 'user';
export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';

export interface User {
  id?: string;
  email: string;
  password: string;
  name?: string;
}

export interface FindAllUserRequest {
  take?: number;
  page?: number;
  sortField?: string;
  sortDirection?: string;
  search?: string;
}
export interface FindAllUserResponse {
  status: number;
  data: User[];
}
export interface FindOneUserRequest {
  id?: string;
  email?: string;
}
export interface FindOneUserResponse {
  status: number;
  data: User;
}
export interface CreateUserRequest {
  email: string;
  password: string;
  name?: string;
}
export interface CreateUserResponse {
  status: number;
  data: User;
}
export interface UpdateUserRequest {
  id: string;
  email?: string;
  password?: string;
  name?: string;
}
export interface UpdateUserResponse {
  status: number;
  data: User;
}
export interface DeleteUserRequest {
  id: string;
}
export interface DeleteUserResponse {
  status: number;
}

export interface UserServiceClient {
  findAll(request: FindAllUserRequest): Observable<FindAllUserResponse>;
  findOne(request: FindOneUserRequest): Observable<FindOneUserResponse>;
  create(request: CreateUserRequest): Observable<CreateUserResponse>;
  update(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  delete(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}
