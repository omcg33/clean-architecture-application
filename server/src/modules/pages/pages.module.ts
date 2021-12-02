import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from '@src/modules/api/api.module';

import { UserAgentMiddleware } from './middlewares/useragent.middleware';

import { ClientService } from './services/client.service';
import { CommonPageService } from './services/common.service';

import { MainPageController } from './controllers/main.controller';
import { CatsListPageController } from './controllers/cats-list.controller';
import { DogsListPageController } from './controllers/dogs-list.controller';



@Module({
  controllers: [CatsListPageController, DogsListPageController, MainPageController],
  imports: [ApiModule],
  providers: [ClientService, CommonPageService],
  exports: [ClientService]
})

// Сюда можно написать миддвары только для урлов Страниц
export class PagesModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(UserAgentMiddleware)
          .forRoutes('/');
      }
}
