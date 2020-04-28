import {Controller, Get, Header, Logger} from '@nestjs/common';
import { AppService } from './app.service';
import {Observable, of} from "rxjs";

const type = "http://localhost:8484";
const linkModel = {
  model: '/model/',
  properties: '/properties/',
  actions: '/actions/',
  things: '/things/',
  type: type
};

@Controller()
export class AppController {
  private logger = new Logger (AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Links', JSON.stringify(linkModel))
  getModel(): Observable <object> {
    this.logger.log(`Getting model information`);
    const result = this.appService.getModel();
    result['links'] = linkModel;
    return of (result);
  }
}
