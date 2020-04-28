import {Controller, Get, Header, Logger} from '@nestjs/common';
import {piNoLD} from '../resources/model';
import {Observable, of} from "rxjs";
import {SensorsController} from "../sensors/sensors.controller";
import {ActionsService} from "./actions.service";

const actions = piNoLD.links.actions;

@Controller(actions.link)
export class ActionsController {
    private logger = new Logger (SensorsController.name);

    constructor(private readonly actionsService: ActionsService) {}

    @Get()
    @Header('Links', JSON.stringify({
        type: 'http://model.webofthings.io/#actions-resource'
    }))
    getSpecificActions(): Observable<any>{
        this.logger.log(`Getting Specific Actuators information`);
        return of(this.actionsService.getActions(actions.resources));
    }
}
