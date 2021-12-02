import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CommonPageService {
    async get(req: Request) {
        return {
            user: {},
            isDesktop: req.useragent.isDesktop,
            location: req.url,
        }
    }
}
