import { PaginationDto } from "src/common/dtos/pagination.dto";

export class GetAllAuditsDto extends PaginationDto {
    email?: string;
}