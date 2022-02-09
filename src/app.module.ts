import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlModule } from './url/url.module';

@Module({
  imports: [UrlModule, ConfigModule.forRoot({
    envFilePath: ['.env.dev.local', '.env'],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
