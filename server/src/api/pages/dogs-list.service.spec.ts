import { Test, TestingModule } from '@nestjs/testing';
import { DogsListPageService } from './dogs-list.service';

describe('DogsListPageService', () => {
  let service: DogsListPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsListPageService],
    }).compile();

    service = module.get<DogsListPageService>(DogsListPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
