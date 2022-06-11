import { inject } from '@loopback/core';
import { get, param, Request, RestBindings } from '@loopback/rest';
import { KymaConnectorService } from '../services';


export class KymaController {
  constructor(
    @inject("services.KymaConnectorService")
    private kymaService: KymaConnectorService
  ) {

  }

  @get('/kyma/connect')
  async kymaConnect(
    @param.query.string('connection_token') token: string,
    @inject(RestBindings.Http.REQUEST) request: Request

  ): Promise<void> {
    await this.kymaService.connect(token);
    return await this.kymaService.registerOwnApiAndEvents(request);
  }

}
