import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/entities/role.entity";

export class CryptUserDto  {

    @ApiProperty({
        example: 1,
        description: 'The unique identifier of the user.',
    })
    id: number;

    @ApiProperty({
        example: 'john_doe',
        description: 'The username of the user.',
    })
    userName: string;

    @ApiProperty({
        example: 'my@gmail.com',
        description: 'The email of the user.',
    })
    email: string;

    @ApiProperty({
        example: 'admin',
        description: 'The role of the user.',
    })
    role: Role;
}
