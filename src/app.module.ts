import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShortenerModule } from './shortener/shortener.module';
import { UrlModule } from './url/url.module';

@Module({
  imports: [ShortenerModule, UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
