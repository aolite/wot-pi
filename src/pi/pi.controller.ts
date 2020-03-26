import { Controller, Get } from '@nestjs/common';
import { Observable, of} from 'rxjs';

@Controller('pi')
export class PiController {
    @Get()
    getPiInformation (): Observable<any>{
        return of("This is de WoT-Pi");
    }
}
