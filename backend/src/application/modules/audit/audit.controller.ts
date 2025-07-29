import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/shared/decorators/roles-auth.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GetAllAuditsDto } from './dtos/get-all-audits.dto';
import { AuditService } from './audit.service';

@ApiTags('Audit Logs')
@Controller('logs')
@ApiBearerAuth()
export class AuditController {
  constructor(private auditService: AuditService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Get()
  @ApiOperation({
    summary: 'Get All Audits',
    description:
      'Retrieves audit logs with pagination and optional email filtering. Only accessible by administrators.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved audit logs',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - User is not authenticated',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - User is not an administrator',
  })
  async getAllAudits(@Query() queryParams: GetAllAuditsDto) {
    return await this.auditService.getAllAudits(queryParams);
  }
}
