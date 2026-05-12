import { Test, TestingModule } from '@nestjs/testing';
import { FbOverrideConfigService } from './fb-override-config.service';

describe('FbOverrideConfigService', () => {
  let service: FbOverrideConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FbOverrideConfigService],
    }).compile();

    service = module.get<FbOverrideConfigService>(FbOverrideConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
