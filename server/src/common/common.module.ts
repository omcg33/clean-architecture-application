import { Module } from '@nestjs/common';
import { CatsGetService } from './cats/get.service';
import { DogsGetService } from './dogs/get.service';
import { GetPagesRoutesService } from './pages/routes/get.service';

@Module({
  providers: [CatsGetService, DogsGetService, GetPagesRoutesService],
  exports:[CatsGetService, DogsGetService, GetPagesRoutesService]
})
export class CommonModule {}
