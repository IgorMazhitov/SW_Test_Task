import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'The name of the role', example: 'Admin' })
  name: string;
}
