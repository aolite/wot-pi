import { Logger } from '@nestjs/common';
import * as coap from 'coap';
import {randomInt} from '../utils/utils';

export class CoapServer {
    private logger = new Logger(CoapServer.name);

    private port = 5683; 
    public start (){
        coap.createServer((req, res) => {
            this.logger.log(`COAP device got a request for ${req.headers['Accept']}`);
            if (req.headers['Accept'] != 'application/json'){
                req.code = '4.06';
                return res.end();
            }

            
            //res.end(JSON.stringify({hello: 'Hello'}));
            switch(req.url){
                case "/co2":
                    this.respond(res, {'co2': randomInt(0, 1000)});
                    break;
                case "/temp":
                    this.respond(res, {'temp': randomInt(0, 40)});
                    break;

                default:
                    this.logger.log('EMPTY')
                    this.respond(res); 
                    
            }
        }).listen(this.port, () => {
            this.logger.log(`COAP server started on port ${this.port}`);
        });
    }

    private respond (res, content = undefined){
        this.logger.log('content'+ content)
        if (content){
            this.logger.log('content'+ content)
            res.setOption('Content-Format', 'application/json')
            res.code= '2.05';
            res.end(JSON.stringify(content));
        } else {
            res.code = '4.04';
            res.end();
        }
    }
}
