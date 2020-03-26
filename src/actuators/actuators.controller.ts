import { Controller, Get, Logger, Put, Param, UseInterceptors } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import resourcesJson from '../resources/resources.json'; 
import { ConverterInterceptor } from 'src/middleware/converter.interceptor';

@Controller('pi/actuators')
@UseInterceptors(ConverterInterceptor)
export class ActuatorsController {
    private logger = new Logger (ActuatorsController.name);

    @Get()
    getActuators(): Observable<any>{
        this.logger.log(`Getting Actuators information`);
        return of(resourcesJson.pi.actuator);
    }

    @Get('/leds/1')
    getActuatorLed1(): Observable<any>{
        this.logger.log(`Getting Actuator LED-1`)
        return of(resourcesJson.pi.actuator.leds[1]);
    }

    @Get('/leds/2')
    getActuatorLed2(): Observable<any>{
        this.logger.log(`Getting Actuator LED-2`)
        return of(resourcesJson.pi.actuator.leds[2]);
    }

    @Put('/leds/:id')
    modifyLedValue(@Param('id') id: number): Observable<any>{
        this.logger.log(`Modifying the LED-${id}`);
        const selectedLed = resourcesJson.pi.actuator.leds[id];
        this.logger.log(`Changed LED ${id} value to ${selectedLed.value}.`);
        return of(selectedLed);
    }
}
