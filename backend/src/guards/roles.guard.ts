import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRole) return true;

      const req = context.switchToHttp().getRequest();

      if (!req.headers.authorization) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      const user = this.jwtService.verify(token, {
        secret: process.env.PRIVATE_KEY,
      });

      if (!user) {
        throw new UnauthorizedException({
          message: 'User is not authorized',
        });
      }

      req.user = user;

      if (user.role.name !== requiredRole) {
        throw new HttpException(
          'You do not have permission to perform this action',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
    }
  }
}
