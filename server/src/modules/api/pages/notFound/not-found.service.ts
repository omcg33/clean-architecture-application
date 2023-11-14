import { Injectable } from '@nestjs/common';

@Injectable()
export class NotFoundPageService {
  async get() {
    return {
      foo: 'bar',
    };
  }
}
