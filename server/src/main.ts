import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { PAGES_URL_ALIASES } from '../../consts';

export enum PAGES_URL_ALIASES {
  CATS_LIST = "catsList",
  DOGS_LIST = "dogsList",    
}

// const createSSRender = require('../../client/dist/ssr').default;
import createSSRender from '../../client/dist/ssr';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const render = await createSSRender();
  const pageRoutes = {
    [PAGES_URL_ALIASES.CATS_LIST]: '/cats',
    [PAGES_URL_ALIASES.DOGS_LIST]: '/dogs'
  }
  console.log(render({location: pageRoutes[PAGES_URL_ALIASES.CATS_LIST], pageRoutes }));
  await app.listen(3000);
}
bootstrap();
