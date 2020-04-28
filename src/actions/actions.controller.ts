import {Body, Controller, Get, Header, Logger, Param, Post, UseInterceptors} from '@nestjs/common';
import {piNoLD} from '../resources/model';
import {Observable, of} from "rxjs";
import {SensorsController} from "../sensors/sensors.controller";
import {ActionsService} from "./actions.service";
import { PATH_METADATA } from '@nestjs/common/constants';
import {ChangeHeaderInterceptor} from "./change-header.interceptor";

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
        return of(this.actionsService.getActions(actions.resources, {
            type: 'http://model.webofthings.io/#actions-resource'
        }));
    }

    @Post(':actionType')
    @UseInterceptors(ChangeHeaderInterceptor)
    getActionType(@Param() actionType:string, @Body() actionDto: any): Observable<object> {
        this.logger.log(`Getting ActionType information from WoT`);
        const routePath = Reflect.getMetadata(PATH_METADATA, ActionsController);
        console.log (routePath);
        const action = this.actionsService.setAction(actionDto);
        //actions.resources[actionType].data.push(action);
        return of ({routePath: routePath + '/' + action['id']})
    }
}
