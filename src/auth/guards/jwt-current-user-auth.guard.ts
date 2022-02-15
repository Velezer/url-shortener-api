import { BadRequestException, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtCurrentUserAuthGuard extends AuthGuard('jwt') {
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
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    if (!this.checkCurrentUser(user.id)) {
      throw new ForbiddenException('you are not current user')
    }

    return user;
  }
}
