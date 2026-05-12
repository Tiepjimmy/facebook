import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from '../decorators/roles.decorator';
  import type { UserRole } from '../constants/user-status.constants';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      // const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      //   context.getHandler(),
      //   context.getClass(),
      // ]);
      //
      // // Không khai báo @Roles => cho qua
      // if (!requiredRoles || requiredRoles.length === 0) {
      //   return true;
      // }
      //
      // const request = context.switchToHttp().getRequest();
      // const user = request.user as { role?: string } | undefined;
      // const userRole = user?.role?.toUpperCase();
      //
      // if (!userRole) {
      //   throw new ForbiddenException('Bạn không có quyền truy cập');
      // }
      //
      // if (!requiredRoles.includes(userRole as UserRole)) {
      //   throw new ForbiddenException('Bạn không có quyền truy cập');
      // }
      //
      return true;
    }
  }
