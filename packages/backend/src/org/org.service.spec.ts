import { Test, TestingModule } from '@nestjs/testing';
import { OrgService } from './org.service';

describe('OrgService', () => {
  let service: OrgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrgService],
    }).compile();

    service = module.get<OrgService>(OrgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
