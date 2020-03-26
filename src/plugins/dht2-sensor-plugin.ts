import { Logger } from '@nestjs/common';
import * as sensorDriver from 'node-dht-sensor';
//import resourcesJson from '../resources/resources.json'; 
import {proxyResource} from '../resources/model';

export class Dht2SensorPlugin {
    private logger= new Logger(Dht2SensorPlugin.name);
    private model = proxyResource.pi.sensors;
    private interval;
    private pluginName: 'Temperature & Humidity';
    private localParams = {'simulate': false, 'frequency': 2000};

    private initialize(): any {
      return sensorDriver.initialize(22, this.model.temperature.gpio); //#A 
    }

    private read (): void {
      const readout = sensorDriver.read(); //#B
      proxyResource.pi.sensors.temperature.value = parseFloat(readout.temperature.toFixed(2));
      proxyResource.pi.sensors.humidity.value = parseFloat(readout.humidity.toFixed(2)); //#C
      this.showValue();
    
      setTimeout(this.read.bind(this), this.localParams.frequency);
    }

    public start (params): void {
        this.logger.log(`Starting Temperature/Humidity Sensor`);
        this.localParams= params;
        if (this.localParams.simulate){
            this.simulate();
        } else {
            this.connectHardware();
        }
    }
    private simulate() {
        this.interval = setInterval(() => {
            proxyResource.pi.sensors.temperature.value = Math.floor(Math.random() * (24.0-19.0)+19.0);
            proxyResource.pi.sensors.humidity.value = Math.floor(Math.random() * (55.0-65.0)+55.0);
            this.showValue();
        }, this.localParams.frequency);

        this.logger.log(`Simulated sensor for Temperture/Humidity sensor Started!`);
    }
    private connectHardware() {
        if (this.initialize()) {
            console.info('Hardware %s sensor started!', this.pluginName);
            this.read();
          } else {
            console.warn('Failed to initialize sensor!');
          }
    }
    private showValue() {
        this.logger.log(`Temperature: ${this.model.temperature.value}`);
        this.logger.log(`Humidity: ${this.model.humidity.value}`);
    }

    public stop (): void {
        clearInterval(this.interval);
        this.logger.log(`Temperature/Humidity plugin stopped!`)
    }
}
