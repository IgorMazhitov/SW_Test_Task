import { IsNumber, IsString } from "class-validator";

export class ChangeItemDto {

    @IsNumber({}, { message: 'Item Id should be number' })
    readonly id: number;
    
    @IsString({ message: 'Item name should be string' })
    readonly name: string;

    @IsString({ message: 'Item description should be string' })
    readonly description: string;
}