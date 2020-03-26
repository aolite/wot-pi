import { Logger } from '@nestjs/common';
import resourcesJson from '../resources/resources.json'; 
import * as onoff from 'onoff';
import { exit } from 'process';

import {proxyResource} from '../resources/model';

export class PirPlugin {
    private logger= new Logger(PirPlugin.name);
    private interval;
    private sensor;
    private model = proxyResource.pi.sensors.pir;
    private pluginName = proxyResource.pi.sensors.pir.name;
    private localParams = {'simulate': false, 'frequency': 2000};

    public start (params): void {
        this.logger.log(`Executing PIR sensor call at GPIO level`);
        this.localParams= params;
        if (this.localParams.simulate){
            this.simulate();
        } else {
            this.connectHardware();
        }
    }

    public stop(): void {
        if (this.localParams.simulate){
            clearInterval(this.interval)
        }else {
            this.sensor.unexport();
        }
        this.logger.log(`${this.pluginName} plugin stopped!`)
    }

    private connectHardware(): void {
        const Gpio = onoff.Gpio;
        this.sensor = new Gpio(this.model.gpio, 'in', 'both');
        this.sensor.watch((err, value) => {
            if (err){
                exit(err);
            }
            proxyResource.pi.sensors.pir.value = !! value;
            this.showValue();
        });
    }

    private simulate(): void {
        this.interval = setInterval(() => {
            proxyResource.pi.sensors.pir.value = !this.model.value;
            this.showValue();
        }, this.localParams.frequency);
        this.logger.log(`Simulated sensor ${this.pluginName} sensor Started!`);
    }

    private showValue(): void {
        this.logger.log(this.model.value? 'there is someone': 'not anymore!');
    }


}
