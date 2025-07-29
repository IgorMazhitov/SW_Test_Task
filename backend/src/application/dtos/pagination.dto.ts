import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsPositive, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'The maximum number of items to return per page',
    minimum: 1,
    default: 10,
  })
  @IsDefined()
  @IsInt({ message: 'Limit must be an integer.' })
  @IsPositive({ message: 'Limit must be a positive integer.' })
  @Min(1, { message: 'Limit must be at least 1.' })
  @Max(10, { message: 'Limit cannot exceed 10.' })
  limit: number;

  @ApiProperty({
    description: 'The page number to return',
    minimum: 1,
    default: 1,
  })
  @IsDefined()
  @IsInt({ message: 'Page must be an integer.' })
  @IsPositive({ message: 'Page must be a positive integer.' })
  @Min(1, { message: 'Page must be at least 1.' })
  page: number;
}
