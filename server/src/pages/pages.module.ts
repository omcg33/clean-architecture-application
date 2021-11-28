import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from '@src/api/api.module';
import { UserAgentMiddleware } from '@src/middlewares/useragent.middleware';

import { RenderService } from './render.service';
import { CommonPageService } from './common.service';

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
