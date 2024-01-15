import { Observable } from 'rxjs';
import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  FindAllRequest,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  UpdateRequest,
  UpdateResponse,
} from './base.pb';

export const protobufPackage = 'user';
export const USER_PACKAGE_NAME = 'user';
export const USER_SERVICE_NAME = 'UserService';

export interface User {
  id?: string;
  email: string;
  password: string;
  name?: string
}

export interface FindAllUserRequest extends FindAllRequest {}
export interface FindAllUserResponse extends FindAllResponse<User> {}
export interface FindOneUserRequest extends FindOneRequest {
  email?: string;
}
export interface FindOneUserResponse extends FindOneResponse<User> {}
export interface CreateUserRequest extends CreateRequest<User> {}
export interface CreateUserResponse extends CreateResponse<User> {}
export interface UpdateUserRequest extends UpdateRequest<User> {}
export interface UpdateUserResponse extends UpdateResponse<User> {}
export interface DeleteUserRequest extends DeleteRequest {}
export interface DeleteUserResponse extends DeleteResponse {}

export interface UserServiceClient {
  findAll(request: FindAllUserRequest): Observable<FindAllUserResponse>;
  findOne(request: FindOneUserRequest): Observable<FindOneUserResponse>;
  create(request: CreateUserRequest): Observable<CreateUserResponse>;
  update(request: UpdateUserRequest): Observable<UpdateUserResponse>;
  delete(request: DeleteUserRequest): Observable<DeleteUserResponse>;
}
