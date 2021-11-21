import { Test, TestingModule } from '@nestjs/testing';
import { CatsListPageService } from './cats-list.service';

describe('CatsListPageService', () => {
  let service: CatsListPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsListPageService],
    }).compile();

    service = module.get<CatsListPageService>(CatsListPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
