import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiResponse } from 'src/app.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
      ) { }

    @HttpCode(HttpStatus.OK)
    @Post()
    async login(@Body() loginUserDto: LoginUserDto): Promise<ApiResponse> {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);

        const data = await this.authService.login(user);

        return {
            statusCode: HttpStatus.OK,
            data: data
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    protectedUrl(){
        return 'protected'
    }
}
