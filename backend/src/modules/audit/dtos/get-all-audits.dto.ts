import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetAllAuditsDto extends PaginationDto {
  @ApiProperty({ required: false, description: 'The email address to filter audits by.' })
  email?: string;
}
