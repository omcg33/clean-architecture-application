import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
// import { config as loadConfigFromEnv } from 'dotenv';
import path from 'path';

// import createSSRender from '../../client/dist/ssr';
// TODO: es import
const createSSRender = require('../../client/dist/ssr').default;

import { PageRoutesService } from './page-routes/page-routes.service';
import { SsRenderService } from './ss-render/ss-render.service';

import { AppModule } from './app.module';
import { CONFIG } from './consts/config';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: true
	});
	
	const configService = app.get(ConfigService);
	const pageRoutesService = app.get(PageRoutesService);
	const ssRenderService = app.get(SsRenderService);

	const host = configService.get(['express', CONFIG.HOST]);
	const port = configService.get(['express', CONFIG.PORT]);
	const basePath = configService.get(['express', CONFIG.BASE_PATH]);

	app.setGlobalPrefix(basePath);
	app.useStaticAssets(
		path.join(process.cwd(), '../client/dist/static'),
		{
			redirect: false,
			prefix: basePath
		}
	);
	app.setBaseViewsDir(path.join(process.cwd(), '../client/dist/templates'));
	app.setViewEngine('hbs');

	const [render, routes] = await Promise.all([
		createSSRender(),
		pageRoutesService.get()
	]);

	ssRenderService.setRender(render);
	ssRenderService.setPageRoutes(routes);

	app.listen(port, host, async () => {
		console.log(`Server listening at http://${host}:${port}`);

		console.log(CONFIG.HOST, configService.get(['express', CONFIG.HOST]));
		console.log(CONFIG.PORT, configService.get(['express', CONFIG.PORT]));
		console.log(CONFIG.BASE_PATH, configService.get(['express', CONFIG.BASE_PATH]));

		console.log(CONFIG.NODE_TLS_REJECT_UNAUTHORIZED, configService.get(['node', CONFIG.NODE_TLS_REJECT_UNAUTHORIZED]));
	});
}

bootstrap();
