
import resourcesJson from '../resources/resources.json'; 
import {EventEmitter} from 'events';

const myEvent = new EventEmitter();
const proxyResource = new Proxy(resourcesJson, {
    get: function(target, prop) {
      myEvent.emit('ws-wot');
      return Reflect.get(target, prop);
    },
    set: function(target, prop, value) {
      return Reflect.set(target, prop, value);
    }
  });

export  {
    proxyResource,
    myEvent
};