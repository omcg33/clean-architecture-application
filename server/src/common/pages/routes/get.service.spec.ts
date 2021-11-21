import { Test, TestingModule } from '@nestjs/testing';
import { GetPagesRoutesService } from './get.service';

describe('GetService', () => {
  let service: GetPagesRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetPagesRoutesService],
    }).compile();

    service = module.get<GetPagesRoutesService>(GetPagesRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
