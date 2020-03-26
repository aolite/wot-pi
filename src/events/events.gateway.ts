import {WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import {Server} from 'ws';
import { inspect } from 'util';
import resourcesJson from '../resources/resources.json'; 
import {myEvent} from '../resources/model';


@WebSocketGateway( { transports: ['websocket'] })
export class EventsGateway /*implements OnGatewayConnection, OnGatewayDisconnect*/{

  @WebSocketServer() server: Server;
  private logger = new Logger(EventsGateway.name);

  handleConnection(client: any, ...args: any[]) {
    this.logger.log(`New Connection:${args [0]}`);
    //this.logger.log(inspect(client))
    this.logger.log(inspect(args[0].url))
    const url = args[0].url;
    this.logger.log(inspect(url));

    client.send('Listening data...');

    myEvent.on('ws-wot', ()=>{
      this.logger.log('Event acquired');
      client.send(JSON.stringify(this.selectedResource(url)));
    });
    
  }

  handleDisconnect(client: any) {
    this.logger.log(`Disconnected Connection:${client}`);
  }

  private selectedResource(url) { //#E
    const parts = url.split('/');
    parts.shift();
    let result = resourcesJson;
    for (let i = 0; i < parts.length; i++) {
      result = result[parts[i]];
    }
    this.logger.log(result);
    return result;
  }
}
