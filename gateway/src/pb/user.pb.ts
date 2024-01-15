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
  id: number;
  email: number;
  password: number;
}

export interface FindAllUserRequest extends FindAllRequest {
  filter?: any;
}
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
  findAll(
    request: FindAllUserRequest,
  ):
    | Promise<FindAllUserResponse>
    | Observable<FindAllUserResponse>
    | FindAllUserResponse;
  findOne(
    request: FindOneUserRequest,
  ):
    | Promise<FindOneUserResponse>
    | Observable<FindOneUserResponse>
    | FindOneUserResponse;
  create(
    request: CreateUserRequest,
  ):
    | Promise<CreateUserResponse>
    | Observable<CreateUserResponse>
    | CreateUserResponse;
  update(
    request: UpdateUserRequest,
  ):
    | Promise<UpdateUserResponse>
    | Observable<UpdateUserResponse>
    | UpdateUserResponse;
  delete(
    request: DeleteUserRequest,
  ):
    | Promise<DeleteUserResponse>
    | Observable<DeleteUserResponse>
    | DeleteUserResponse;
}
