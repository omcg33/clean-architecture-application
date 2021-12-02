import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { HttpExplorer } from './http';
import { CatsGetService } from './cats/get.service';
import { DogsGetService } from './dogs/get.service';
import { GetPagesRoutesService } from './pages/routes/get.service';

@Module({
  imports: [DiscoveryModule],
  providers: [HttpExplorer, CatsGetService, DogsGetService, GetPagesRoutesService],
  exports: [HttpExplorer, CatsGetService, DogsGetService, GetPagesRoutesService]
})
export class CommonModule {}
