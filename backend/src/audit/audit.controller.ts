import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; 
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
  getAllAudits(@Req() req) {
    console.log('audit')
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    const [bearer, token] = authHeader.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User is not authorized' });
    }
    return this.auditService.getAllAudits(token);
  }
}
