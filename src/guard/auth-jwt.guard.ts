import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/public.decorator';
import { ROLE_KEY } from 'src/decorator/role.decorator';

@Injectable()
export class AuthJwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true;
    if (await super.canActivate(context)) {
      const roles = this.reflector.getAllAndMerge(ROLE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      const request = context.switchToHttp().getRequest();
      const userRole = request.user.role;

      if (roles.length === 0) return true;
      return roles.includes(userRole);
    }
    return false;
  }
}
