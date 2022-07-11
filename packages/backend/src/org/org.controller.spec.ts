import { Test, TestingModule } from '@nestjs/testing';
import { OrgController } from './org.controller';
import { OrgService } from './org.service';

describe('OrgController', () => {
  let controller: OrgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrgController],
      providers: [OrgService],
    }).compile();

    controller = module.get<OrgController>(OrgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
