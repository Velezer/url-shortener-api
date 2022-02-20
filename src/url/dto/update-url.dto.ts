import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty, IsNotEmpty, IsUrl } from 'class-validator';
import { CreateUrlDto } from './create-url.dto';

export class UpdateUrlDto extends PartialType(CreateUrlDto) {
    @IsEmpty()
    longUrl?: string;

    @IsNotEmpty()
    shortName?: string;

}
