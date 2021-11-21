import { Module } from '@nestjs/common';
import { CommonModule } from 'common/common.module';
import { CatsListPageController } from './pages/cats-list.controller';
import { CatsListPageService } from './pages/cats-list.service';

@Module({
  controllers: [CatsListPageController],
  imports: [CommonModule],
  providers: [CatsListPageService],
  exports: [CatsListPageService]
})
export class ApiModule {}