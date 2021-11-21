import { Test, TestingModule } from '@nestjs/testing';
import { CommonPageService } from './common.service';

describe('CommonService', () => {
  let service: CommonPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommonPageService],
    }).compile();

    service = module.get<CommonPageService>(CommonPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
