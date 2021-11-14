import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { GetPagesRoutesService } from './get-pages-routes/get-pages-routes.service';


import createSSRender from '../../client/dist/ssr';


import { AppModule } from './app.module';


async function bootstrap() {
  const getPageRoutesService = new GetPagesRoutesService();

  const [ app, render, routes] = await Promise.all([
    NestFactory.create<NestExpressApplication>(AppModule, {
      bodyParser: true 
    }),
    createSSRender(),
    getPageRoutesService.get()
  ])

  console.log(render({ location: '/cats', pageRoutes: routes }));
  await app.listen(3000);
}

bootstrap();
