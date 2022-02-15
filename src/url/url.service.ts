import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUrlDto: CreateUrlDto, user: any) {
    const url = this.urlRepo.create(createUrlDto)
    url.user = user

    try {
      const result = await this.urlRepo.save(url);
      return result
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException('short name cannot be used', err.message)
      }

    }

  }

  findAll() {
    return this.urlRepo.find()
  }

  async findOneByShortName(shortName: string): Promise<Url> {
    const found = await this.urlRepo.findOne({ shortName });
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  private checkUrlOwner(url: Url, userId: number){
    if (url.user.id !== userId) {
      throw new ForbiddenException('this url is not yours')
    }
  }

  async update(shortName: string, updateUrlDto: UpdateUrlDto, userId: number) {
    const found = await this.findOneByShortName(shortName)
    this.checkUrlOwner(found, userId)

    found.shortName = updateUrlDto.shortName //update the shortName

    return await this.urlRepo.save(found);
  }

  async remove(shortName: string, userId: number) {
    const found = await this.findOneByShortName(shortName)
    this.checkUrlOwner(found, userId)

    return this.urlRepo.remove(found);
  }
}
