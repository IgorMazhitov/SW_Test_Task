import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * This method checks if the user is authorized by verifying the JWT token.
   * @param context - The execution context containing the request.
   * @returns true if the user is authorized, otherwise throws an UnauthorizedException.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

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

      return true;
    } catch (error) {
      throw new UnauthorizedException({
        message: 'User is not authorized',
      });
    }
  }
}
