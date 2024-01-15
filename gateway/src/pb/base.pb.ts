import { Observable } from 'rxjs';

export interface FindAllRequest {
  take?: number;
  page?: number;
  sortField?: string;
  sortDirection?: string;
  filter?: any;
}

export interface FindAllResponse<T> {
  status: number;
  data: T[];
}

export interface FindOneRequest {
  id?: string;
}

export interface FindOneResponse<T> {
  status: number;
  data: T;
}

export interface CreateRequest<T> {
  data: T;
}

export interface CreateResponse<T> {
  status: number;
  data: T;
}

export interface UpdateRequest<T> {
  id: string;
  data: T;
}

export interface UpdateResponse<T> {
  status: number;
  data: T;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse<T> {
  status: number;
  data: T;
}

export interface BaseServiceClient<T> {
  findAll(
    request: FindAllRequest,
  ):
    | Promise<FindAllResponse<T>>
    | Observable<FindAllResponse<T>>
    | FindAllResponse<T>;
  findOne(
    request: FindOneRequest,
  ):
    | Promise<FindOneResponse<T>>
    | Observable<FindOneResponse<T>>
    | FindOneResponse<T>;
  create(
    request: CreateRequest<T>,
  ):
    | Promise<CreateResponse<T>>
    | Observable<CreateResponse<T>>
    | CreateResponse<T>;
  update(
    request: UpdateRequest<T>,
  ):
    | Promise<UpdateResponse<T>>
    | Observable<UpdateResponse<T>>
    | UpdateResponse<T>;
  delete(
    request: DeleteRequest,
  ):
    | Promise<DeleteResponse<T>>
    | Observable<DeleteResponse<T>>
    | DeleteResponse<T>;
}
