import { Test, TestingModule } from '@nestjs/testing';
import { CatsListPageController } from './cats-list.controller';

describe('CatsListPageController', () => {
  let controller: CatsListPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsListPageController],
    }).compile();

    controller = module.get<CatsListPageController>(CatsListPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
