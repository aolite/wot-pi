import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PirPlugin } from './plugins/pir-plugin';
import { Dht2SensorPlugin } from './plugins/dht2-sensor-plugin';
import { LedPlugin } from './plugins/led-plugin';
import { WsAdapter } from '@nestjs/platform-ws';
import { CoapServer } from './server/coap-server';
import { CoapPlugin } from './plugins/coap-plugin';

async function bootstrap() {
  const logger = new Logger();
  const pirPlugin = new PirPlugin ();
  const dhtPlugin = new Dht2SensorPlugin(); 
  const ledPlugin = new LedPlugin(); 
  const coapPlugin = new CoapPlugin();
  const coapServer = new CoapServer();

  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(8484);
  logger.log(`Your WoT Pi is up and running on port ${8484}`);

  coapServer.start();


  //pirPlugin.start({'simulate': true, 'frequency': 2000});
  dhtPlugin.start({'simulate': true, 'frequency': 10000});
  //ledPlugin.start({'simulate': true});
  //coapPlugin.start({'simulate': false, 'frequency': 1000});
}
bootstrap();
