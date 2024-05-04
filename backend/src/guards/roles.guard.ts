import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])
            if (!requiredRole) {
                return true
            }
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            console.log('test roles 1')

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({
                    message: 'User is not authorized'
                })
            }
            console.log('test roles 2')
            const user = this.jwtService.verify(token)
            console.log('test roles')
            req.user = user
            return user.role.name === requiredRole
        } catch (error) {
            throw new HttpException('User is not admin', HttpStatus.FORBIDDEN)
        }
    }

}