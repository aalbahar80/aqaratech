import { PartialType } from '@nestjs/swagger';
import { PortfolioDto } from './portfolio.dto';

export class UpdatePortfolioDto extends PartialType(PortfolioDto) {}
