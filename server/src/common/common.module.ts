import { Module } from '@nestjs/common';
import { CatsGetService } from './cats/get.service';
import { GetPagesRoutesService } from './pages/routes/get.service';

@Module({
  providers: [CatsGetService, GetPagesRoutesService],
  exports:[CatsGetService, GetPagesRoutesService]
})
export class CommonModule {}
