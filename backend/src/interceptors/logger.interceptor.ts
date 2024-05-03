import { Injectable, NestInterceptor, ExecutionContext, CallHandler, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditService } from 'src/audit/audit.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: AuditService, private jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    const startTime = Date.now();
    const { method, url, headers, body } = req;
    const authHeader = req.headers.authorization;
    const [bearer, token] = authHeader.split(' ');

    try {
      let userEmail;
      if (token) {
        const decodedToken = this.jwtService.verify(token);
        userEmail = decodedToken.email;
      }

      const requestInfo = {
        method,
        url,
        headers,
        body,
        userEmail: userEmail ? userEmail : null,
        timestamp: new Date().toISOString(),
      };
      return next.handle().pipe(
        tap(() => {
          const executionTime = Date.now() - startTime;
          const responseInfo = {
            status: res.statusCode,
            executionTime,
            timestamp: new Date().toISOString(),
          };

          // Log request and response
          this.loggerService.logRequest(requestInfo, requestInfo.userEmail);
          this.loggerService.logResponse(requestInfo, responseInfo, requestInfo.userEmail);
        }),
      );
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid token', error });
    }
  }
}
