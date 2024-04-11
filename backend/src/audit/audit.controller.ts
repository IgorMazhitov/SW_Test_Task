import { Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('logs')
export class AuditController {
  constructor(private auditService: AuditService) {}


  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post('/all')
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
