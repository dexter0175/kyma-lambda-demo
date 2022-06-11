import {injectable, /* inject, */ BindingScope, inject} from '@loopback/core';
import axios from 'axios';
import https from 'https';
import { connection, event } from "@varkes/app-connector"
import { Request } from '@loopback/rest';
import { v4 } from 'uuid'
import connectorIntegration from '../EventIntegration';

@injectable({scope: BindingScope.SINGLETON})
export class KymaConnectorService {
  httpsAgent: https.Agent;
  
  /* inject, */;
  constructor(/* Add @inject to inject parameters */) {
    connectorIntegration.setEventConnector(this);
  }

  async connect(token: string) {
    await connection.connect(token);

    this.httpsAgent = new https.Agent({
      cert: connection.certificate(),
      key: connection.privateKey(),
    });
  
  }

  async registerOwnApiAndEvents(request: Request) {
    const origin = this.getOrigin(request);

    return this.call(connection.info()!.metadataUrl, 'POST', {
      "provider": "my Api Provider 1",
      "name": "Some rest api",
      "description": "My custom external api",
      "shortDescription": "Short description",
      "api": {
        "targetUrl": origin,
      }
    })
  }

  getOrigin(req: Request) {
    let result;
    console.log(`Pr.: ${req.protocol}\nheader.origin: ${req.headers.origin}\nheader.host: ${req.headers.host}\nheader.referer: ${req.headers.referer}`);
    if (req.baseUrl && !req.baseUrl.match(/http(s)?:\/\//)) {
        result = req.protocol + req.baseUrl
    } else {
        result = req.baseUrl || req.headers.origin || "https://" + req.headers.host || req.headers.referer || '';
    }
    result = result.replace(/\/$/, "");

    console.log("Registering service at", result);
    
    return result;
  }

  // Possibility to do custom API calls. 
  // Note: replace with `connection` or `event` or `api` methods if possible.
  async call (url:string, method = 'GET', data?: any) {
    if (!this.httpsAgent) {
      throw "Kyma is not connected";
    }

    await axios.request({
      url,
      method, 
      data,
      httpsAgent: this.httpsAgent 
    });
  }

  async sendEvent(type: string, data: any) {
    return await event.sendLegacyEvent({
      "event-type": type,
      "event-type-version": "v1",
      "event-id": v4(),
      "event-time": new Date().toISOString(),
      "data": data
    });
  }

  /*
   * Add service methods here
   */
}
