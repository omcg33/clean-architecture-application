import { Injectable, NestMiddleware } from '@nestjs/common';
import useragent from 'express-useragent';

const middleware = useragent.express();

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('MIDDLE')
    middleware(req, res, next)
  }
}
