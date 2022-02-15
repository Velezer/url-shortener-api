import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from 'src/app.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtCurrentUserAuthGuard } from './guards/jwt-current-user-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<ApiResponse> {
        const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);

        const data = await this.authService.login(user);

        return {
            statusCode: HttpStatus.OK,
            data: data
        }
    }

    @UseGuards(JwtCurrentUserAuthGuard)
    @Get()
    protectedUrl(@Req() req: any) {

        return req.user
    }
    @Get(':id')
    @UseGuards(JwtCurrentUserAuthGuard)
    protecteadUrl(@Req() req: any) {
        return req.user
    }
}
