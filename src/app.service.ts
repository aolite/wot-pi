import {Injectable, Logger} from '@nestjs/common';
import {piNoLD} from './resources/model';
import {extractFields} from "./utils/utils";

@Injectable()
export class AppService {
  private logger = new Logger (AppService.name);
  getModel(): object {
    this.logger.log('getting all information about the Thing');
    const fields = ['id', 'name', 'description', 'tags', 'customFields'];
    return extractFields(fields, piNoLD);
  }
}
