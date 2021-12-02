import { Injectable } from '@nestjs/common';
import { delay } from '@src/modules/common/utils';

@Injectable()
export class CatsGetService {
    async get() {
        await delay(500);
        
        return [
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
        ]
    }
}
