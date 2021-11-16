import { Test, TestingModule } from '@nestjs/testing';
import { SsRenderService } from './ss-render.service';

describe('SsRenderService', () => {
  let service: SsRenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SsRenderService],
    }).compile();

    service = module.get<SsRenderService>(SsRenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
