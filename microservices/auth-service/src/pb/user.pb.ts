import { Observable } from 'rxjs';

export interface UserServiceClient {
  findOne(data: { id?: number; username?: string; email?: string }): any;
  create(data: { email: string; password: string }): any;
}

export const protobufPackage = 'user';
export const AUTH_SERVICE_NAME = 'UserService';

// export interface CreateRequest {
//   email: string;
//   password: string;
// }

// export interface CreateResponse {
//   status: number;
//   error: string[];
// }
