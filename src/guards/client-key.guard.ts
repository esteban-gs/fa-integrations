import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
/**
 * Represents an non auth guard that simply looks for a client key to prevent abuse
 */
export class ClientKeyGuard implements CanActivate {
  constructor(private readonly configs: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const clientKey = request.headers['client-key'];
    if (clientKey === this.configs.get('APP_API_CLIENT_KEY')) {
      Logger.log('Evaluation Successful', 'ClientKeyGuard');
      return true;
    }
    return false;
  }
}
