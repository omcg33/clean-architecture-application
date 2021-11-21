import { Module } from '@nestjs/common';
import { CommonModule } from 'common/common.module';
import { CatsListPageController } from './pages/cats-list.controller';
import { DogsListPageController } from './pages/dogs-list.controller';
import { CatsListPageService } from './pages/cats-list.service';
import { DogsListPageService } from './pages/dogs-list.service';

@Module({
  controllers: [CatsListPageController, DogsListPageController],
  imports: [CommonModule],
  providers: [CatsListPageService, DogsListPageService],
  exports: [CatsListPageService, DogsListPageService]
})

// Сюда можно написать миддвары только для урлов АПИ
export class ApiModule {}