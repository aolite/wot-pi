import {Injectable, Logger} from '@nestjs/common';
import {isoTimestamp, modelToResources} from '../utils/utils'
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ActionsService {
    private logger = new Logger (ActionsService.name);

    getActions (actionsResources, links): object {
        this.logger.log('Getting Actions information');
        return {
            links: links,
            type: 'actions',
            entityId: 'actions',
            result: modelToResources(actionsResources, true) //TODO: Check when data is provided to the led.
        }
    }

    setAction (actionDto: any): object {
        this.logger.log(`Setting ActionType information at:`);
        const action = actionDto;
        action.id = uuidv4();
        action.timestamp = isoTimestamp();
        action.status = 'pending';
        return action;
    }
}
