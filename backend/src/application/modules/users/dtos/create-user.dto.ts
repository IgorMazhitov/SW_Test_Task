import { IsOptional, IsString, IsEmail, Length, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ 
        description: 'The name of the user',
        example: 'John Doe'
    })
    @IsOptional()
    @IsString({ message: 'User name has to be a string'})
    readonly userName: string;

    @ApiProperty({ 
        description: 'The email of the user',
        example: 'john@example.com'
    })
    @IsString({ message: 'User email has to be a string'})
    @IsEmail({}, { message: 'User email is invalid' })
    readonly email: string;

    @ApiProperty({ 
        description: 'The password of the user',
        example: 'password123'
    })
    @IsString({ message: 'User password has to be a string'})
    @Length(4, 16, { message: 'User password should be more than 4 digits and less than 16' })
    readonly password: string;

    @ApiProperty({ 
        required: false, 
        description: 'The role ID of the user',
        example: 1
    })
    @IsOptional()
    @IsNumber({}, { message: 'Role Id should be number' })
    readonly roleId?: number;
}
