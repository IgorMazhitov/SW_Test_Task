import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@ApiTags('Audit Logs')
@Controller('logs')
@ApiBearerAuth()
export class AuditController {
  constructor(private auditService: AuditService) {}

  @UseGuards(RolesGuard)
  @Roles('Admin')
  @Post('/all')
  @ApiTags('Get All Audits')
  @ApiBearerAuth()
  async getAllAudits(
    @Req() req,
    @Body() body: { page: number, limit: number, email?: string},
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }

    const { page = 1, limit = 10, email } = body;
    return this.auditService.getAllAudits(token, { page, limit }, email);
  }
}
