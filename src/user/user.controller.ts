import { Controller, Get, Post, Body, Param, Delete, Res, HttpStatus, Put, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/app.dto';
import { JwtCurrentUserAuthGuard } from 'src/auth/guards/jwt-current-user-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    const data = await this.userService.create(createUserDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: data
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async findAll(): Promise<ApiResponse> {
  //   const data = await this.userService.findAll();

  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: data
  //   }
  // }

  @UseGuards(JwtCurrentUserAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse> {
    const data = await this.userService.findOne(+id);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }

  }

  @UseGuards(JwtCurrentUserAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<ApiResponse> {
    const data = await this.userService.update(+id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  @UseGuards(JwtCurrentUserAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiResponse> {
    await this.userService.remove(+id);

    return { statusCode: HttpStatus.NO_CONTENT }
  }
}
