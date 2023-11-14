import { Injectable } from '@nestjs/common';
import { delay } from '../../../modules/common/utils';

@Injectable()
export class CatsGetService {
  async get() {
    await delay(500);

    return [
      {
        id: 1,
        name: 'Cat0',
        description: 'desc',
        image:
          'https://static.probusiness.io/720x480c/n/03/d/38097027_439276526579800_2735888197547458560_n.jpg',
      },
      {
        id: 2,
        name: 'Cat1',
        description: 'desc',
        image: 'https://i.ytimg.com/vi/1Ne1hqOXKKI/maxresdefault.jpg',
      },
    ];
  }
}
