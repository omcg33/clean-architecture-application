import { Test, TestingModule } from '@nestjs/testing';
import { CatsListController } from './cats-list.controller';

describe('CatsListController', () => {
  let controller: CatsListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsListController],
    }).compile();

    controller = module.get<CatsListController>(CatsListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
