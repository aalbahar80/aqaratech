import { PartialType } from '@nestjs/swagger';
import { PortfolioDto } from './create-portfolio.dto';

export class UpdatePortfolioDto extends PartialType(PortfolioDto) {}
