import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ActionType } from '../database/action.entity';

export class ActionRequestDto {
  @ApiProperty({ description: 'The ID of the user making the request', example: 1 })
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId: number;

  @ApiProperty({ description: 'The type of action being requested', enum: ActionType })
  @IsEnum(ActionType, { message: 'Action type should be a valid enum value' })
  readonly type: ActionType;

  @ApiProperty({ description: 'The description of the action request', example: 'Requesting action for XYZ' })
  @IsString({ message: 'Item description should be string' })
  readonly description: string;

  @ApiProperty({ description: 'The ID of the item (optional)', example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'Item id should be string' })
  readonly itemId?: number;

  @ApiProperty({ description: 'The ID of the user receiving the item (optional)', example: 2, required: false })
  @IsOptional()
  @IsNumber({}, { message: 'User Id to whom item is given should be a number' })
  readonly userGetId?: number;
}

export class ApproveActionDto {
  @ApiProperty({ description: 'The ID of the action to be approved', example: 1 })
  @IsNumber({}, { message: 'Action id should be number' })
  readonly actionId: number;
}
