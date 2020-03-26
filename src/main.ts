import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PirPlugin } from './plugins/pir-plugin';
import { Dht2SensorPlugin } from './plugins/dht2-sensor-plugin';
import { LedPlugin } from './plugins/led-plugin';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const logger = new Logger();
  const pirPlugin = new PirPlugin ();
  const dhtPlugin = new Dht2SensorPlugin(); 
  const ledPlugin = new LedPlugin(); 

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(8484);
  logger.log(`Your WoT Pi is up and running on port ${8484}`);

  pirPlugin.start({'simulate': true, 'frequency': 2000});
  dhtPlugin.start({'simulate': true, 'frequency': 10000});
  ledPlugin.start({'simulate': true});
}
bootstrap();
