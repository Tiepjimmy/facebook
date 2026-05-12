import { Test, TestingModule } from '@nestjs/testing';
import { ExtentionController } from './extention.controller';

describe('ExtentionController', () => {
  let controller: ExtentionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtentionController],
    }).compile();

    controller = module.get<ExtentionController>(ExtentionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
