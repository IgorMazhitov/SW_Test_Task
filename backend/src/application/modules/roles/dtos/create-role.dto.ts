import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RoleType } from 'src/domain/entities/role.entity';

export class CreateRoleDto {
  @ApiProperty({ 
    description: 'The name of the role', 
    example: 'Admin',
    enum: RoleType,
    enumName: 'RoleType'
  })
  @IsEnum(RoleType, { message: 'Role name has to be a valid role type' })
  name: RoleType;
}
