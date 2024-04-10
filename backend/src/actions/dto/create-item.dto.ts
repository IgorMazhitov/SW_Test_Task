import { IsNumber, IsString } from "class-validator";

export class CreateItemDto {
    @IsString({ message: 'Item name should be string' })
    readonly name: string;

    @IsString({ message: 'Item description should be string' })
    readonly description: string;
}