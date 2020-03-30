import { Controller, UseInterceptors, Logger, Get } from '@nestjs/common';
import { ConverterInterceptor } from 'src/middleware/converter.interceptor';
import { Observable, of } from 'rxjs';
import resourcesJson from '../resources/resources.json'; 

@Controller('/things/coapDevice')
@UseInterceptors(ConverterInterceptor)
export class CoapDeviceController {
    private logger = new Logger (CoapDeviceController.name);

    @Get('/sensors/co2')
    getCO2(): Observable<any>{
        this.logger.log(`Getting Humidity sensor information`);
        return of(resourcesJson['things'].coapDevice.sensors.co2);
    }
}
