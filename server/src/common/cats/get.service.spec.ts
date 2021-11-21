import { Test, TestingModule } from '@nestjs/testing';
import { CatsGetService } from './get.service';

describe('GetService', () => {
  let service: CatsGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsGetService],
    }).compile();

    service = module.get<CatsGetService>(CatsGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
