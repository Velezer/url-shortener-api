import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PayloadUser } from './dto/payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<PayloadUser> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    throw new UnauthorizedException();
  }

  async login(user: PayloadUser) {
    const payload = user;
    return {
      access_token: this.jwtService.sign(payload, { 
        secret: process.env.JWT_SECRET,
      }),
    };
  }
}
