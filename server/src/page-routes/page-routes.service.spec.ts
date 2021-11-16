import { Test, TestingModule } from '@nestjs/testing';
import { PageRoutesService } from './page-routes.service';

describe('PageRoutesService', () => {
  let service: PageRoutesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageRoutesService],
    }).compile();

    service = module.get<PageRoutesService>(PageRoutesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
