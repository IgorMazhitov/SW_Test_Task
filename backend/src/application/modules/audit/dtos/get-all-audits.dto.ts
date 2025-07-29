import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/application/dtos/pagination.dto';

export class GetAllAuditsDto extends PaginationDto {
  @ApiProperty({
    required: false,
    description: 'The email address to filter audits by.',
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email address should be valid' })
  email?: string;
}
