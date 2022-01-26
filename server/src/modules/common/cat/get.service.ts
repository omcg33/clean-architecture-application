import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { delay } from '@src/modules/common/utils';
import { CONFIG } from '@src/consts/config';

@Injectable()
export class CatGetService {
    constructor(
        private _configService: ConfigService
    ) {}

    async get(id: number) {
        // Имитация получения урла до внешнего сервиса из конфига
        await delay(500);

        const data = [
            {
                id: 1,
                name: "Cat0",
                description: "desc",
                image: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554__340.jpg"
            },
            {
                id: 2,
                name: "Cat1",
                description: "desc",
                image: "https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg"
            }
        ];

        const element = data.find(cat => cat.id === id);

        if (!element)
            throw new NotFoundException('');
            
        return element;
    }
}
