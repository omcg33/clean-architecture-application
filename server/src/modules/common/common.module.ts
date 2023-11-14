import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { HttpExplorer } from './http';
import { CatsGetService } from './cats/get.service';
import { DogsGetService } from './dogs/get.service';
import { CatGetService } from './cat/get.service';
import { DogGetService } from './dog/get.service';

@Module({
  imports: [DiscoveryModule, ConfigModule],
  providers: [
    HttpExplorer,
    CatsGetService,
    DogsGetService,
    CatGetService,
    DogGetService,
  ],
  exports: [
    HttpExplorer,
    CatsGetService,
    DogsGetService,
    CatGetService,
    DogGetService,
  ],
})
export class CommonModule {}
