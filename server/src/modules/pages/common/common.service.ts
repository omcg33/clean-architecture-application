import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export interface ICommonPageData {
    user: Record<string, string>;
    isDesktop: boolean;
    location: string;
}
@Injectable()
export class CommonPageService {
    async get(req: Request): Promise<ICommonPageData> {
        return {
            user: {},
            isDesktop: req.useragent.isDesktop,   
            location: req.originalUrl
        }
    }
}
