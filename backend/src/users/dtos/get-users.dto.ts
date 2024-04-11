import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersDto {
  @IsString({ message: 'Role Id should be number' })
  readonly role: string;
}
