import { Module } from '@nestjs/common';
import { CommonModule } from '@src/modules/common/common.module';
import { ApiCatsListPageController } from './pages/catsList/cats-list.controller';
import { ApiDogsListPageController } from './pages/dogsList/dogs-list.controller';
import { CatsListPageService } from './pages/catsList/cats-list.service';
import { DogsListPageService } from './pages/dogsList/dogs-list.service';
import { ApiMainPageController } from './pages/main/main.controller';
import { MainPageService } from './pages/main/main.service';
import { CatPageService } from './pages/cat/cat.service';
import { DogPageService } from './pages/dog/dog.service';
import { ApiCatPageController } from './pages/cat/cat.controller';
import { ApiDogPageController } from './pages/dog/dog.controller';

@Module({
  controllers: [ApiCatsListPageController, ApiDogsListPageController, ApiMainPageController, ApiCatPageController, ApiDogPageController],
  imports: [CommonModule],
  providers: [CatsListPageService, DogsListPageService, MainPageService, CatPageService, DogPageService],
  exports: [CatsListPageService, DogsListPageService,  CatPageService, DogPageService, MainPageService]
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}