import { Module } from '@nestjs/common';
import { CommonModule } from '@src/modules/common/common.module';
import { ApiCatsListPageController } from './pages/cats-list.controller';
import { ApiDogsListPageController } from './pages/dogs-list.controller';
import { CatsListPageService } from './pages/cats-list.service';
import { DogsListPageService } from './pages/dogs-list.service';
import { ApiMainPageController } from './pages/main.controller';
import { MainPageService } from './pages/main.service';
import { CatPageService } from './pages/cat.service';
import { DogPageService } from './pages/dog.service';
import { ApiCatPageController } from './pages/cat.controller';
import { ApiDogPageController } from './pages/dog.controller';

@Module({
  controllers: [ApiCatsListPageController, ApiDogsListPageController, ApiMainPageController, ApiCatPageController, ApiDogPageController],
  imports: [CommonModule],
  providers: [CatsListPageService, DogsListPageService, MainPageService, CatPageService, DogPageService],
  exports: [CatsListPageService, DogsListPageService,  CatPageService, DogPageService, MainPageService]
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}