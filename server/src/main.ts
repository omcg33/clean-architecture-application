import path from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import morgan from 'morgan';

import { createRender } from '../../client/dist/ssr';

import { ClientService } from './modules/pages/helpers/services/client.service';

import { AppModule } from './app.module';
import { CONFIG } from './consts/config';
import { getNamedRoutes } from './modules/common/http';
import { filterApiRoutes, filterPagesRoutes } from './helpers/router';

const ASSETS_PATH = path.join(process.cwd(), '../client/dist/static');
const TEMPLATES_PATH = path.join(process.cwd(), '../client/dist/templates');

async function bootstrap() {
	
	const [app, ssr] = await Promise.all([
		NestFactory.create<NestExpressApplication>(AppModule, {
			bodyParser: true
		}),
		createRender({ assetsPath: ASSETS_PATH }),
	]);

	const configService = app.get(ConfigService);	
	const clientService = app.get(ClientService);

	const host = configService.get(CONFIG.HOST);
	const port = configService.get(CONFIG.PORT);
	const basePath = configService.get(CONFIG.BASE_PATH);

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

	app.listen(port, host, async () => {
		const namedRoutes = getNamedRoutes();

		clientService.setSSR(ssr);
		clientService.setPagesRoutes(
			filterPagesRoutes(namedRoutes)
		);
		clientService.setApiRoutes(
			filterApiRoutes(namedRoutes)
		);

		console.log(`Server listening at http://${host}:${port}`);

		console.log(CONFIG.HOST, host);
		console.log(CONFIG.PORT, port);
		console.log(CONFIG.BASE_PATH, basePath);

		console.log(CONFIG.NODE_TLS_REJECT_UNAUTHORIZED, configService.get(CONFIG.NODE_TLS_REJECT_UNAUTHORIZED));
	});
}

bootstrap();
