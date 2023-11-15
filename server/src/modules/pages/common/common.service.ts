import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ILocation } from '@clean-arch/common';

export interface ICommonPageData {
    user: Record<string, string>;
    isDesktop: boolean;
    location: ILocation;
}

@Injectable()
export class CommonPageService {
    async get(req: Request): Promise<ICommonPageData> {
        return {
            user: {},
            isDesktop: req.useragent.isDesktop,   
            location: { pathname: req.originalUrl }
        }
    }
}
