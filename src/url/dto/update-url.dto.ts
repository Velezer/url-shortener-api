import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty } from 'class-validator';
import { CreateUrlDto } from './create-url.dto';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
    @IsEmpty()
    longUrl?: string;

    @IsNotEmpty()
    shortUrl: string;
}
