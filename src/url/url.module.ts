import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { urlProviders } from './url.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UrlController],
  providers: [...urlProviders, UrlService]
})
export class UrlModule { }
