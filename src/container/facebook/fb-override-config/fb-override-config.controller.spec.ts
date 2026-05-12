import { Test, TestingModule } from '@nestjs/testing';
import { FbOverrideConfigController } from './fb-override-config.controller';

describe('FbOverrideConfigController', () => {
  let controller: FbOverrideConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FbOverrideConfigController],
    }).compile();

    controller = module.get<FbOverrideConfigController>(FbOverrideConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
