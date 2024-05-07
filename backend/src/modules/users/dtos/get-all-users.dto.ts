import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class GetAllUsersDto extends PaginationDto {
  @ApiProperty({ example: 1, description: 'The ID of the sender.' })
  @IsNumber({}, { message: 'Sender ID should be a number' })
  senderId: number;

  @ApiProperty({ example: 2, description: 'The ID of the role.' })
  @IsNumber({}, { message: 'Role ID should be a number' })
  roleId: number;
}
