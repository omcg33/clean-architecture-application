import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CommonPageService {
    async get(req: Request) {
        return {
            user: {},
            isDesktop: true,
            // isDesktop: req.useragent.isDesktop,
            url: req.url,
        }
    }
}
