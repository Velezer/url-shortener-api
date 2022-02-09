import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { Url } from './entities/url.entity';
import { APPCONSTANTS } from '../app.constants';

@Injectable()
export class UrlService {
  constructor(
    @Inject(APPCONSTANTS.urlRepository)
    private urlRepo: Repository<Url>
  ) { }

  create(createUrlDto: CreateUrlDto) {

    return 'This action adds a new url';
  }

  findAll() {
    return `This action returns all url`;
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
