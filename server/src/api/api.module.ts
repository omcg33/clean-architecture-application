import { Module } from '@nestjs/common';
import { CommonModule } from '@src/common/common.module';
import { CatsListPageController } from './pages/cats-list.controller';
import { DogsListPageController } from './pages/dogs-list.controller';
import { CatsListPageService } from './pages/cats-list.service';
import { DogsListPageService } from './pages/dogs-list.service';
import { MainPageController } from './pages/main.controller';
import { MainPageService } from './pages/main.service';

@Module({
  controllers: [CatsListPageController, DogsListPageController, MainPageController],
  imports: [CommonModule],
  providers: [CatsListPageService, DogsListPageService, MainPageService],
  exports: [CatsListPageService, DogsListPageService, MainPageService]
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}