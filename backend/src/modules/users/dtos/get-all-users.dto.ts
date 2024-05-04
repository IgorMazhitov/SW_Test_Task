import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetAllUsersDto extends PaginationDto {
  @ApiProperty({ example: 1, description: 'The ID of the sender.' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the role.' })
  roleId: number;
}
