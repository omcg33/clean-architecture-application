import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthorsService {
    private _authors = {
        1: {
            id: 1,
            firstName: "First",
            lastName: "FirstLastname",
        },
        2: {
            id: 2,
            firstName: "Second",
            lastName: "SecondLastname",
        },
    }
    public findOneById(id: number) {
        const author = this._authors[id];

        return author
    }
}
