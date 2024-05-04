import { PaginationDto } from "src/common/dtos/pagination.dto";


export class GetAllUsersDto extends PaginationDto {
    senderId: number;
    roleId: number;
}