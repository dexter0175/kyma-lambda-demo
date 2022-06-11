import {inject} from '@loopback/core';
import {
  Request,
  RestBindings,
  get,
} from '@loopback/rest';
import { eventTrigger } from '../EventIntegration';


/**
 * A simple controller to bounce back http requests
 */
export class PingController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  // Map to `GET /ping`
  @eventTrigger("ping.activated")
  @get('/ping')
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }
}
