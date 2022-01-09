import { Module, MiddlewareConsumer, DynamicModule } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ApiModule } from '@src/modules/api/api.module';

import { UserAgentMiddleware } from './middlewares/useragent.middleware';

import { ClientService } from './services/client.service';
import { CommonPageService } from './services/common.service';

import { MainPageController } from './controllers/main.controller';
import { CatsListPageController } from './controllers/cats-list.controller';
import { DogsListPageController } from './controllers/dogs-list.controller';

import { CatPageController } from './controllers/cat.controller';
import { DogPageController } from './controllers/dog.controller';

import { NotFoundExceptionFilter } from './exceptions/notFoundException';

@Module({
  controllers: [
    CatsListPageController, CatPageController, DogsListPageController,
    MainPageController, DogPageController
  ],
  imports: [ApiModule],
  providers: [
    ClientService,
    CommonPageService,
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
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
