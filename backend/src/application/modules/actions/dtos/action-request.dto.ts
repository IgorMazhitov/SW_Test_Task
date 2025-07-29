import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/application/dtos/pagination.dto';
import { ActionType } from 'src/domain/entities/action.entity';

export class ActionRequestDto {
  @ApiProperty({
    description: 'The ID of the user making the request',
    example: 1,
  })
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId: number;

  @ApiProperty({
    description: 'The type of action being requested',
    enum: ActionType,
  })
  @IsEnum(ActionType, { message: 'Action type should be a valid enum value' })
  readonly type: ActionType;

  @ApiProperty({
    description: 'The description of the action request',
    example: 'Requesting action for XYZ',
  })
  @IsString({ message: 'Item description should be string' })
  readonly description: string;

  @ApiProperty({
    description: 'The ID of the item (optional)',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Item id should be string' })
  readonly itemId?: number;

  @ApiProperty({
    description: 'The ID of the user receiving the item (optional)',
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'User Id to whom item is given should be a number' })
  readonly userGetId?: number;
}

export class ApproveActionDto {
  @ApiProperty({
    description: 'The ID of the action to be approved',
    example: 1,
  })
  @IsNumber({}, { message: 'Action id should be number' })
  readonly actionId: number;

  @ApiProperty({
    description: 'The ID of the user approving the action',
    example: 2,
  })
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId: number;
}

export class GetAllActionsDto extends PaginationDto {
  @ApiProperty({
    description: 'The ID of the user to get actions for',
    example: 1,
  })
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId: number;

  @ApiProperty({
    description: 'The type of action to get',
    enum: ActionType,
    required: false,
  })
  @IsOptional()
  @IsEnum(ActionType, { message: 'Action type should be a valid enum value' })
  readonly type?: ActionType;

  @ApiProperty({
    description: 'The status of the action to get',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Action status should be boolean' })
  readonly active?: boolean;
}
