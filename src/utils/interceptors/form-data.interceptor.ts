import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class FormDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.body) {
      request.body = this.deepConvertValues(request.body);
    }
    return next.handle();
  }

  private deepConvertValues(obj: any): any {
    if (obj instanceof Array) {
      return obj.map((item) => this.deepConvertValues(item));
    } else if (obj instanceof Object && !(obj instanceof Buffer)) {
      Object.keys(obj).forEach((key) => {
        obj[key] = this.deepConvertValues(obj[key]);
      });
      return obj;
    } else {
      return this.convertValue(obj);
    }
  }

  private convertValue(value: any): any {
    if (typeof value === 'string') {
      if (value === 'true' || value === 'false') {
        return value === 'true';
      } else if (!isNaN(Number(value)) && value.trim() !== '') {
        return Number(value);
      }
    }
    return value;
  }
}
