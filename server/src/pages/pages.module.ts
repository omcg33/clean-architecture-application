import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiModule } from 'api/api.module';
import { CatsListController } from './cats-list.controller';
import { RenderService } from './render.service';
import { CommonPageService } from './common.service';

import { UserAgentMiddleware } from 'middlewares/useragent.middleware';

@Module({
  controllers: [CatsListController],
  imports: [ApiModule],
  providers: [RenderService, CommonPageService],
  exports: [RenderService]
})
export class PagesModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(UserAgentMiddleware)
        //   .with({ path: '/' } as Route)
          .forRoutes();
      }
}
