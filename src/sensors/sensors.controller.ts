import { Observable, of } from 'rxjs';
import { Controller, Get, Logger, Next, UseInterceptors } from '@nestjs/common';
import resourcesJson from '../resources/resources.json'; 
import { ConverterInterceptor } from 'src/middleware/converter.interceptor';

@Controller('pi/sensors')
@UseInterceptors(ConverterInterceptor)
export class SensorsController {
    private logger = new Logger (SensorsController.name);

    @Get()
    getSensors(): Observable<any>{
        this.logger.log(`Getting Sensors information`);
        return of(resourcesJson.pi.sensors);
    }

    @Get('/pir')
    getPir(): Observable<any>{
        this.logger.log(`Getting Pir sensor information`);
        return of(resourcesJson.pi.sensors.pir);
    }

    @Get('/temperature')
    getTemperature(): Observable<any>{
        this.logger.log(`Getting Temperature sensor information`);
        return of(resourcesJson.pi.sensors.temperature);
    }

    @Get('/humidity')
    getHumidity(): Observable<any>{
        this.logger.log(`Getting Humidity sensor information`);
        return of(resourcesJson.pi.sensors.humidity);
    }
}
