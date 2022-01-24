import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';

import { delay } from '@src/modules/common/utils';
import { CONFIG } from '@src/consts/config';

@Injectable()
export class DogGetService {
    constructor(
        private _configService: ConfigService
    ) {}

    async get(id: number) {
        // Имитация получения урла до внешнего сервиса из конфига
        await delay(500);

        const data = [
            {
                id: 1,
                name: "Dog0",
                description: "desc",
                image: "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg"
            },
            {
                id: 2,
                name: "Dog1",
                description: "desc",
                image: "https://happypik.ru/wp-content/uploads/2019/09/krasivye-cshenki4.jpg"
            }
        ];

        const element = data.find(dog => dog.id === id);

        if (!element)
            throw new NotFoundException('');

        return element;
    }
}
