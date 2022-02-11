import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpCode } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { ApiResponse } from './dto/api-response.dto';
import { Response } from 'express';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto, @Res() res: Response) {
    const data = await this.urlService.create(createUrlDto);

    const apires: ApiResponse = {
      statusCode: HttpStatus.CREATED,
      data: data
    }
    return res.json(apires)
  }

  @Get('')
  async findAll(@Res() res: Response) {
    const data = await this.urlService.findAll()

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Get(':shortUrl')
  async findOne(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const data = await this.urlService.findOneByShortUrl(shortUrl);

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Patch(':shortUrl')
  async update(@Param('shortUrl') shortUrl: string, @Body() updateUrlDto: UpdateUrlDto, @Res() res: Response) {
    const data = await this.urlService.update(shortUrl, updateUrlDto);

    const apires: ApiResponse = {
      statusCode: HttpStatus.OK,
      data: data
    }
    return res.json(apires)
  }

  @Delete(':shortUrl')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    await this.urlService.remove(shortUrl);
    return res.json()
  }
}
