import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedUser } from 'src/interfaces/user.interface';

@Injectable()
export class AqaratechStaffGuard implements CanActivate {
  private readonly logger = new Logger(AqaratechStaffGuard.name);

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug('Enforcing staff guard');

    const request = context.switchToHttp().getRequest<IRequest>();
    const authenticatedUser = request.user;

    if (authenticatedUser.isAqaratechStaff) {
      return true;
    } else {
      // throw instead?
      return false;
    }
  }
}

/**
 * As received from jwt.strategy
 */
interface IRequest extends Request {
  user: AuthenticatedUser;
}
