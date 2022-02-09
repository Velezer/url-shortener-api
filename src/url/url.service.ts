import { Inject, Injectable } from '@nestjs/common';
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

  create(createUrlDto: CreateUrlDto) {

    return 'This action adds a new url';
  }

  findAll() {
    return this.urlRepo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} url`;
  }

  update(id: number, updateUrlDto: UpdateUrlDto) {
    return `This action updates a #${id} url`;
  }

  remove(id: number) {
    return `This action removes a #${id} url`;
  }
}
