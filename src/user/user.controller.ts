import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiResponse } from 'src/app.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const data = await this.userService.create(createUserDto);

    const apires: ApiResponse = {
      statusCode: HttpStatus.CREATED,
      data: data
    }
    return res.json(apires)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.userService.findAll();

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.userService.findOne(+id);

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Res() res: Response) {
    const data = await this.userService.update(+id, updateUserDto);

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.userService.remove(+id);

    return res.json()
  }
}
