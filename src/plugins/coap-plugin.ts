import { Logger } from "@nestjs/common";
import {addDevice, randomInt} from '../utils/utils';
import * as coap from 'coap';
import bl from 'bl'

import {proxyResource} from '../resources/model';

export class CoapPlugin {
    private logger= new Logger(CoapPlugin.name);
    private interval;
    private pluginName: '';
    private localParams = {'simulate': false, 'frequency': 2000};

    public start (params): void {
        this.logger.log(`Executing COAP Gateway`);
        this.configure();
        this.localParams= params;
        if (this.localParams.simulate){
            this.simulate();
        } else {
            this.connectHardware();
        }
    }

    public stop (){
        clearInterval(this.interval);
        this.logger.log(`${this.pluginName} plugin stopped!`);
    }

    private configure (){
        addDevice('coapDevice', 'A CoAP Device', 'A CoAP Device',
        {
            'co2':{
                'name': 'CO2 Sensor',
                'description' : 'An ambient CO2 sensor',
                'unit': 'ppm',
                'value': 0
            }
        });
        this.localParams = proxyResource['things'].coapDevice.name;
    }
    private simulate() {
        this.interval = setInterval(() =>{
            proxyResource['things'].coapDevice.sensors.co2['value'] = randomInt(0, 1000);
            this.showValue();
          }, this.localParams.frequency);
          this.logger.log(`Simulated ${this.pluginName} sensor started!`);
    }
    private connectHardware() {
        const sensor = {
            read: () => {
                coap.request({
                    host: 'localhost',
                    port: 5683,
                    pathname: '/co2',
                    options: {'Accept': 'application/json'}
                })
                .on ('response', (res) => {
                    this.logger.log(`COAP response code ${res.code}`);
                    if(res.code !== '2.05'){
                        this.logger.error(`Error while contacting CoAP service: ${res.code}`);
                    }
                    res.pipe(bl((err,data)=> {
                        const json = JSON.parse(data);
                        proxyResource['things'].coapDevice.sensors.co2['value'] = json.co2;
                        this.showValue();
                    }));
                }).end();
            }
        };

        this.interval = setInterval( () => {
            sensor.read();
        }, this.localParams.frequency);
    }

    private showValue (){
        this.logger.log(`CO2 Level: ${proxyResource['things'].coapDevice.sensors.co2['value']} ppm`);
    }
}
