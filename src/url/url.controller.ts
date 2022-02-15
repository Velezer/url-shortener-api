import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiResponse } from '../app.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto): Promise<ApiResponse> {
    const data = await this.urlService.create(createUrlDto);

    return {
      statusCode: HttpStatus.CREATED,
      data: data
    }
  }

  @Get('')
  async findAll(): Promise<ApiResponse> {
    const data = await this.urlService.findAll()

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  @Get(':shortUrl')
  async findOne(@Param('shortUrl') shortUrl: string): Promise<ApiResponse> {
    const data = await this.urlService.findOneByShortUrl(shortUrl);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  // @UseGuards(JwtUrlOwner)
  @Patch(':shortUrl')
  async update(@Param('shortUrl') shortUrl: string, @Body() updateUrlDto: UpdateUrlDto): Promise<ApiResponse> {
    const data = await this.urlService.update(shortUrl, updateUrlDto);

    return {
      statusCode: HttpStatus.OK,
      data: data
    }
  }

  // @UseGuards(JwtUrlOwner)
  @Delete(':shortUrl')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shortUrl') shortUrl: string): Promise<ApiResponse> {
    await this.urlService.remove(shortUrl);
    return { statusCode: HttpStatus.NO_CONTENT }
  }
}
