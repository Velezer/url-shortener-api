import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto)

    try {
      const result = await this.userRepo.save(user);
      return result
    } catch (err) {
      if (err instanceof QueryFailedError) {
        throw new ConflictException(err.message)
      } 
     
    }
  }

  findAll() {
    return this.userRepo.find()
  }

  async findOne(id: number) {
    const found = await this.userRepo.findOne(id);
    if (!found) {
      throw new NotFoundException()
    }
    return found
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const found = await this.findOne(id)
    found.email = updateUserDto.email
    found.username = updateUserDto.username
    found.password = updateUserDto.password
    
    return await this.userRepo.save(found);
  }

  async remove(id: number) {
    const found = await this.findOne(id)
    return this.userRepo.remove(found);
  }
}
