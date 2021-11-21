import path from 'path';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from 'nestjs-config';
import { ApiModule } from './api/api.module';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from './common/common.module';

import { routes } from './routes';

@Module({
  imports: [
		ConfigModule.load(
      path.resolve(__dirname, './config', '**/!(*.d).{ts,js}')
    ),
    RouterModule.register(routes),
    ApiModule,
		PagesModule,
		CommonModule,
  ]
})

export class AppModule {}
