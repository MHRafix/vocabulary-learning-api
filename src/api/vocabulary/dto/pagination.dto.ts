import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  readonly page?: number;

  @IsOptional()
  readonly limit?: number;
}
