import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HostParam } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create(createUrlDto);
  }

  @Get('')
  findAll() {
    return this.urlService.findAll();
  }

  @Get(':shortUrl')
  findOne(@Param('shortUrl') shortUrl: string) {
    return this.urlService.findOneByShortUrl(shortUrl);
  }

  @Patch(':shortUrl')
  update(@Param('shortUrl') shortUrl: string, @Body() updateUrlDto: UpdateUrlDto) {
    return this.urlService.update(shortUrl, updateUrlDto);
  }

  @Delete(':shortUrl')
  remove(@Param('shortUrl') shortUrl: string) {
    return this.urlService.remove(shortUrl);
  }
}
