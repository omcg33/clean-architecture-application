import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    public get() {
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
