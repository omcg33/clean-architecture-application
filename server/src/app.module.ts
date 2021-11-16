import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { AppController } from './app.controller';
import { PageRoutesService } from './page-routes/page-routes.service';
import { SsRenderService } from './ss-render/ss-render.service';
import { CatsService } from './api/pages/cats.service';

@Module({
  imports: [
		ConfigModule.load(
      path.resolve(__dirname, './config', '**/!(*.d).{ts,js}')
    ),
  ],
  controllers: [AppController],
  providers: [PageRoutesService, SsRenderService, CatsService],
})
export class AppModule {}
