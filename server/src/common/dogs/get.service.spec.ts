import { Test, TestingModule } from '@nestjs/testing';
import { DogsGetService } from './get.service';

describe('GetService', () => {
  let service: DogsGetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsGetService],
    }).compile();

    service = module.get<DogsGetService>(DogsGetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
