import { Module, MiddlewareConsumer } from '@nestjs/common';

import { ApiModule } from '@src/modules/api/api.module';

import { UserAgentMiddleware } from './helpers/middlewares/useragent.middleware';

import { ClientService } from './helpers/services/client.service';
import { CommonPageService } from './common/common.service';

import { MainPageController } from './main/main.controller';
import { CatsListPageController } from './cats-list/cats-list.controller';
import { DogsListPageController } from './dogs-list/dogs-list.controller';

import { CatPageController } from './cat/cat.controller';
import { DogPageController } from './dog/dog.controller';



@Module({
  controllers: [
    CatsListPageController, CatPageController, DogsListPageController,
    MainPageController, DogPageController
  ],
  imports: [ApiModule],
  providers: [
    ClientService,
    CommonPageService,
  ],
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
