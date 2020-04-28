import {findProperty} from "../utils/utils";

export class CorePlugin {
    private params: object;
    private model: any;
    private doStop: any;
    private doSimulate: any;
    private actions: any;
    private doAction:any;

    constructor (params: object, propertyId: string, doStop: any,
                 doSimulate: any, actionsIds: any, doAction: any){
        if(params) this.params = params;
        else this.params = {'simulate': false, 'frequency': 5000};

        this.doAction = doAction;
        this.doStop = doStop;
        this.doSimulate = doSimulate;
        this.actions = actionsIds;
        this.model = findProperty(propertyId);
    }
}
