import { Injectable } from '@nestjs/common';
import { CatsGetService } from '@src/common/cats/get.service';
import { DogsGetService } from '@src/common/dogs/get.service';

@Injectable()
export class MainPageService {
    constructor(
        private _getCatsService: CatsGetService,
        private _getDogsService: DogsGetService
    ) {}

    async get() {
        const [ cats, dogs ] = await Promise.all([
            this._getCatsService.get(),
            this._getDogsService.get()
        ])

        return {
            cats,
            dogs
        }
    }
}
