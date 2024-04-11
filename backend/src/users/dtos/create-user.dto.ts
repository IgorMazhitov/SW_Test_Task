import { IsEmail, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreateUserDto {
    @IsOptional()
    @IsString({ message: 'User name has to be a string'})
    readonly userName: string;
    @IsString({ message: 'User email has to be a string'})
    @IsEmail({}, { message: 'User email is invalid' })
    readonly email: string;
    @IsString({ message: 'User password has to be a string'})
    @Length(4, 16, { message: 'User password should be more than 4 digits and less than 16' })
    readonly password: string;
    @IsOptional()
    @IsNumber({}, { message: 'Role Id should be number' })
    readonly roleId?: number;
}