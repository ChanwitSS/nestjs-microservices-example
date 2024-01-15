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

export interface DeleteResponse {
  status: number;
}
