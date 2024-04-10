import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ActionType } from "../database/action.entity";

export class ActionRequestDto {
    @IsNumber({}, { message: 'User id should be number' })
    readonly userId: number;

    @IsEnum(ActionType, { message: 'Action type should be a valid enum value' })
    readonly type: ActionType;

    @IsString({ message: 'Item description should be string' })
    readonly description: string;

    @IsOptional()
    @IsString({ message: 'Item ids should be string' })
    readonly itemIds?: string;
}