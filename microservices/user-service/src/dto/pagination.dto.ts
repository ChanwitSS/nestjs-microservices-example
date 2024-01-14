import { IsArray } from 'class-validator';
import { Expose } from 'class-transformer';

export class PageDto {
  @Expose()
  take: number;
  @Expose()
  page: number;
  @Expose()
  sortField: number;
  @Expose()
  sortDirection: number;
}
