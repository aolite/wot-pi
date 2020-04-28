import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiController } from './pi/pi.controller';
import { SensorsController } from './sensors/sensors.controller';
import { ActuatorsController } from './actuators/actuators.controller';
import { EventsModule } from './events/events.module';
import { CoapDeviceController } from './coap-device/coap-device.controller';
import { ActionsController } from './actions/actions.controller';
import { ActionsService } from './actions/actions.service';

@Module({
  imports: [EventsModule],
  controllers: [AppController, PiController, SensorsController, ActuatorsController, CoapDeviceController, ActionsController],
  providers: [AppService, ActionsService],
})
export class AppModule {}
