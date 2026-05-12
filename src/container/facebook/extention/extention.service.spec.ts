import { Test, TestingModule } from '@nestjs/testing';
import { ExtentionService } from './extention.service';

describe('ExtentionService', () => {
  let service: ExtentionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtentionService],
    }).compile();

    service = module.get<ExtentionService>(ExtentionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
