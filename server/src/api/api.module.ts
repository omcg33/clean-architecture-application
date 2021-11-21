import { Module } from '@nestjs/common';
import { CommonModule } from 'common/common.module';
import { CatsListPageController } from './pages/cats-list.controller';
import { DogsListPageController } from './pages/dogs-list.controller';
import { CatsListPageService } from './pages/cats-list.service';
import { DogsListPageService } from './pages/dogs-list.service';
import { IndexController } from './pages/index.controller';
import { IndexService } from './pages/index.service';
import { MainController } from './pages/main.controller';
import { MainService } from './pages/main.service';

@Module({
  controllers: [CatsListPageController, DogsListPageController, IndexController, MainController],
  imports: [CommonModule],
  providers: [CatsListPageService, DogsListPageService, IndexService, MainService],
  exports: [CatsListPageService, DogsListPageService]
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}