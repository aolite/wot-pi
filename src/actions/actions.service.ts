import {Injectable, Logger} from '@nestjs/common';
import {modelToResources} from '../utils/utils'

@Injectable()
export class ActionsService {
    private logger = new Logger (ActionsService.name);

    getActions (actionsResources): object {
        this.logger.log('Getting Actions information');
        return {
            type: 'actions',
            entityId: 'actions',
            result: modelToResources(actionsResources, true) //TODO: Check when data is provided to the led.
        }
    }
}
