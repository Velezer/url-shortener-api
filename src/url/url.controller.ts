import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode, UseGuards, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiResponse } from '../app.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('urls')
@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUrlDto: CreateUrlDto, @Req() req: any): Promise<ApiResponse> {
    const url = await this.urlService.create(createUrlDto, req.user.userId);

    return {
      statusCode: HttpStatus.CREATED,
      data: url
    }
  }

  // @Get('')
  // async findAll(): Promise<ApiResponse> {
  //   const data = await this.urlService.findAll()

  //   return {
  //     statusCode: HttpStatus.OK,
  //     data: data
  //   }
  // }

  @Get(':shortName')
  async findOne(@Param('shortName') shortName: string): Promise<ApiResponse> {
    const data = await this.urlService.findOneByShortName(shortName);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':shortName')
  async update(@Param('shortName') shortName: string, @Body() updateUrlDto: UpdateUrlDto, @Req() req: any): Promise<ApiResponse> {
    const data = await this.urlService.update(shortName, updateUrlDto, req.user.id);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':shortName')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shortName') shortName: string, @Req() req: any): Promise<ApiResponse> {
    await this.urlService.remove(shortName, req.user.id);
    return { statusCode: HttpStatus.NO_CONTENT }
  }
}
