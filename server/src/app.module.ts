import Joi from 'joi';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from './modules/api/api.module';
import { PagesModule } from './modules/pages/pages.module';
import { CommonModule } from './modules/common/common.module';
import { CONFIG } from './consts/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        [CONFIG.HOST]: Joi.string().hostname().default('localhost'),
        [CONFIG.PORT]: Joi.number().default(3000),
        [CONFIG.BASE_PATH]: Joi.string()
          .uri({ relativeOnly: true })
          .default('/'),

        [CONFIG.NODE_TLS_REJECT_UNAUTHORIZED]: Joi.number().default(1),
      }),
    }),
    RouterModule.register([
      {
        path: '/',
        module: PagesModule,
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
  providers: [],
  controllers: [],
})
export class AppModule {}
