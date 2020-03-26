import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import json2html from 'node-json2html';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const msgpack = require('msgpack5')()

export interface Response<T> {
  T;
}

@Injectable()
export class ConverterInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private logger = new Logger (ConverterInterceptor.name)
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.log('Transforming data....');
    return next.handle().pipe(map(data => {
      const [req, res] = context.getArgs();
      const encode = msgpack.encode;

      if (req.accepts('json')){
        this.logger.log(`JSON representation selected`);
        return data;
      }
      if (req.accepts('html')){
        this.logger.log(`HTML representation selected`);
        const transform = {'tag': 'div', 'html': '${name} :${value}'};
        return json2html.transform(data, transform)
      }
      if(req.accepts('application/x-msgpack')){
        this.logger.log(`MessagePack representation selected`);
        res.type('application/x-msgpack');
        return encode(data)
      }
  
      this.logger.log('Defaulting to JSON representation')
      return data;
    }));
  }
}
