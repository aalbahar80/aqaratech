import { Test, TestingModule } from '@nestjs/testing';
import { PortfoliosService } from './portfolios.service';

describe('PortfoliosService', () => {
  let service: PortfoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfoliosService],
    }).compile();

    service = module.get<PortfoliosService>(PortfoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
