import { Module } from '@nestjs/common';
import { CommonModule } from '@src/modules/common/common.module';

import { ApiCatsListPageController } from './pages/catsList/cats-list.controller';
import { ApiDogsListPageController } from './pages/dogsList/dogs-list.controller';

import { CatsListPageService } from './pages/catsList/cats-list.service';
import { DogsListPageService } from './pages/dogsList/dogs-list.service';

import { ApiMainPageController } from './pages/main/main.controller';
import { MainPageService } from './pages/main/main.service';

import { ApiCatPageController } from './pages/cat/cat.controller';
import { CatPageService } from './pages/cat/cat.service';

import { DogPageService } from './pages/dog/dog.service';
import { ApiDogPageController } from './pages/dog/dog.controller';

import { NotFoundPageService } from './pages/notFound/not-found.service';
import { ApiNotFoundPageController } from './pages/notFound/not-found.controller';

@Module({
  controllers: [
    ApiCatsListPageController,
    ApiDogsListPageController,
    ApiMainPageController,
    ApiCatPageController,
    ApiDogPageController,
    ApiNotFoundPageController,
  ],
  imports: [CommonModule],
  providers: [
    CatsListPageService,
    DogsListPageService,
    MainPageService,
    CatPageService,
    DogPageService,
    NotFoundPageService,
  ],
  exports: [
    CatsListPageService,
    DogsListPageService,
    CatPageService,
    DogPageService,
    MainPageService,
    NotFoundPageService,
  ],
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}
