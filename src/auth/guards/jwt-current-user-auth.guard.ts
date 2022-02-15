import { BadRequestException, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './jwt-auth.guard';

/**
 * check url params id with payload jwt
 */
@Injectable()
export class JwtCurrentUserAuthGuard extends JwtAuthGuard {
  private id: number;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.params.id){
      throw new BadRequestException('request params id is required')
    }
    this.id = +request.params.id

    return super.canActivate(context)

  }

  checkCurrentUser(userId: number): boolean {
    if (this.id === userId) return true
    return false
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (!this.checkCurrentUser(user.id)) {
      throw new ForbiddenException('you are not current user')
    }

    return user;
  }
}
