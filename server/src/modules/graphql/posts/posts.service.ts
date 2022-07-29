import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    private _posts = [
        {
            id: 1,
            authorId: 1,
            title: "FIRST Post of author 1",
            votes: 10
        },
        {
            id: 2,
            authorId: 1,
            title: "Second Post of author 1",
            votes: 20
        },
        {
            id: 3,
            authorId: 2,
            title: "FIRST Post of author 2",
            votes: 30
        },
        {
            id: 4,
            authorId: 2,
            title: "Second Post of author 2",
            votes: 40
        },
    ]
    public findAll({ authorId }) {
        const posts = this._posts.filter(post => post.authorId === authorId)

        return posts
    }
}
