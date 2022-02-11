import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError, Repository } from 'typeorm';
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

    try {
      const result = await this.urlRepo.save(url);
      return result
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException(err.message)
      } 
     
    }

  }

  findAll() {
    return this.urlRepo.find()
  }

  async findOneByShortUrl(shortUrl: string): Promise<Url> {
    const found = await this.urlRepo.findOne({ shortUrl });
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async update(shortUrl: string, updateUrlDto: UpdateUrlDto) {
    const found = await this.findOneByShortUrl(shortUrl)
    found.shortUrl = updateUrlDto.shortUrl //update the shortUrl

    return await this.urlRepo.save(found);
  }

  async remove(shortUrl: string) {
    const found = await this.findOneByShortUrl(shortUrl)
    return this.urlRepo.remove(found);
  }
}
