import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from 'api/api.module';
import { RenderService } from './render.service';
import { CommonPageService } from './common.service';

import { UserAgentMiddleware } from 'middlewares/useragent.middleware';

import { MainPageController } from './main.controller';
import { CatsListPageController } from './cats-list.controller';
import { DogsListPageController } from './dogs-list.controller';



@Module({
  controllers: [CatsListPageController, DogsListPageController, MainPageController],
  imports: [ApiModule],
  providers: [RenderService, CommonPageService],
  exports: [RenderService]
})

// Сюда можно написать миддвары только для урлов Страниц
export class PagesModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(UserAgentMiddleware)
          .forRoutes('/');
      }
}
