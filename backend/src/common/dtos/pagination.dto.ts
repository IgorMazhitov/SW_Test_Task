import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
    @ApiProperty({
        description: 'The maximum number of items to return per page',
        minimum: 1,
        default: 10,
    })
    limit: number;

    @ApiProperty({
        description: 'The page number to return',
        minimum: 1,
        default: 1,
    })
    page: number;
}
