import path from 'path';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from 'nestjs-config';

import { ApiModule } from './modules/api/api.module';
import { PagesModule } from './modules/pages/pages.module';
import { CommonModule } from './modules/common/common.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, './config', '**/!(*.d).{ts,js}')
    ),
    RouterModule.register([
      {
        path: '/',
        module: PagesModule
      },
      {
        path: '/api',
        module: ApiModule,
      },
    ]),
    ApiModule,
    PagesModule,
    CommonModule,
  ],
  providers: []
})

export class AppModule { }
