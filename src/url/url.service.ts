import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UrlService {

  constructor(
    @InjectRepository(Url)
    private urlRepo: Repository<Url>,
  ) { }

  async create(createUrlDto: CreateUrlDto) {
    const url = this.urlRepo.create(createUrlDto)

    const res = await this.urlRepo.save(url)

    return res;
  }

  findAll() {
    return this.urlRepo.find()
  }

  findOneByShortUrl(shortUrl: string) {
    return this.urlRepo.findOne({ shortUrl });
  }

  async update(shortUrl: string, updateUrlDto: UpdateUrlDto) {
    const found = await this.urlRepo.findOne({ shortUrl })

    return this.urlRepo.update(found.id, updateUrlDto);
  }

  async remove(shortUrl: string) {
    const found = await this.urlRepo.findOne({ shortUrl })
    return this.urlRepo.delete(found.id);
  }
}
