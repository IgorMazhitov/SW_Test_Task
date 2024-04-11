import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ActionType } from '../database/action.entity';

export class ActionRequestDto {
  @IsNumber({}, { message: 'User id should be number' })
  readonly userId: number;

  @IsEnum(ActionType, { message: 'Action type should be a valid enum value' })
  readonly type: ActionType;

  @IsString({ message: 'Item description should be string' })
  readonly description: string;

  @IsOptional()
  @IsNumber({}, { message: 'Item id should be string' })
  readonly itemId?: number;

  @IsOptional()
  @IsNumber({}, { message: 'User Id to whom item is given should be a number' })
  readonly userGetId?: number;
}

export class ApproveActionDto {
    @IsNumber({}, { message: 'Action id should be number' })
    readonly actionId: number;
  }
  