import resourcesJson from '../resources/resources.json';  
import * as onoff from 'onoff';
import { Logger } from '@nestjs/common';

export class LedPlugin {
    private logger= new Logger(LedPlugin.name);
    private interval;
    private actuator;
    private model = resourcesJson.pi.actuator.leds[1];
    private pluginName = resourcesJson.pi.actuator.leds[1].name;
    private localParams = {'simulate': false, 'frequency': 2000};

    public start (params): void {
        this.logger.log(`Executing LED actuator call at GPIO level`);
        this.localParams= params;
        this.observe(this.model);

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
            this.actuator.unexport();
        }
        this.logger.log(`${this.pluginName} plugin stopped!`)
    }

    private connectHardware(): void {
        const Gpio = onoff.Gpio;
        this.actuator = new Gpio(this.model.gpio, 'out'); //#D
        this.logger.log(`Hardware ${this.pluginName} actuator started!`);
    }
    private simulate(): void {
        this.interval = setInterval(() => {
            if (this.model.value) {
              this.model.value = false;
            } else {
              this.model.value = true;
            }
          }, this.localParams.frequency);
          this.logger.log(`Simulated ${this.pluginName} actuator started!`);
    }

    private observe(what){
        const proxy = new Proxy (what, {
          get: (target, prop) => {
              this.logger.log('PROXY GET: ')
              return Reflect.get(target, prop);
          }, 
          set: (target, prop, value) => {
            this.logger.log(`Change detected by plugin for ${this.pluginName}...`, );
            this.switchOnOff(this.model.value)
            return Reflect.get(target, prop, value);
          }
        });
    }

    private switchOnOff(value){
        if (!this.localParams.simulate) {
            this.actuator.write(value === true ? 1 : 0, function () { //#C
              console.info(`Changed value of ${this.pluginName} to ${value}`);
            });
          }
    }

}
