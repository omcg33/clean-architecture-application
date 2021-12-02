import path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import morgan from 'morgan';

// TODO: es import
import { createSSRender } from '../../client/dist/ssr';
// const createSSRender = require('../../client/dist/ssr').default;

import { GetPagesRoutesService } from './modules/common/pages/routes/get.service';
import { ClientService } from './modules/pages/services/client.service';

import { AppModule } from './app.module';
import { CONFIG } from './consts/config';

const ASSETS_PATH = path.join(process.cwd(), '../client/dist/static');
const TEMPLATES_PATH = path.join(process.cwd(), '../client/dist/templates');

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: true
	});
	
	const configService = app.get(ConfigService);
	const getPagesRoutesService = app.get(GetPagesRoutesService);
	const clientService = app.get(ClientService);

	const host = configService.get(['express', CONFIG.HOST]);
	const port = configService.get(['express', CONFIG.PORT]);
	const basePath = configService.get(['express', CONFIG.BASE_PATH]);

	app.setGlobalPrefix(basePath);
	app.use(morgan('tiny'));
	app.useStaticAssets(
		ASSETS_PATH,
		{
			redirect: false,
			prefix: basePath
		}
	);
	app.setBaseViewsDir(TEMPLATES_PATH);
	app.setViewEngine('hbs');

	const [render, routes] = await Promise.all([
		createSSRender(),
		getPagesRoutesService.get()
	]);

	clientService.setSSR(render);
	clientService.setPageRoutes(routes);

	app.listen(port, host, async () => {
		console.log(`Server listening at http://${host}:${port}`);

		console.log(CONFIG.HOST, configService.get(['express', CONFIG.HOST]));
		console.log(CONFIG.PORT, configService.get(['express', CONFIG.PORT]));
		console.log(CONFIG.BASE_PATH, configService.get(['express', CONFIG.BASE_PATH]));

		console.log(CONFIG.NODE_TLS_REJECT_UNAUTHORIZED, configService.get(['node', CONFIG.NODE_TLS_REJECT_UNAUTHORIZED]));
	});
}

bootstrap();
