import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString({ message: 'Item name should be string' })
  readonly name: string;

  @IsString({ message: 'Item description should be string' })
  readonly description: string;
}

export class GiveItemDto {
  @IsNumber({}, { message: 'Item Id should be number' })
  readonly itemId: number;

  @IsOptional()
  @IsNumber({}, { message: 'User Id should be number' })
  readonly userId: number;

  @IsOptional()
  @IsEmail({}, { message: 'Users email should be email' })
  readonly userEmail: string;
}
