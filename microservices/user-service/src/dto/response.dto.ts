import { Expose } from 'class-transformer';

export class ResponseDto<T> {
  @Expose()
  successful: Boolean;
  @Expose()
  error: Error;
  @Expose()
  data: T;
}
