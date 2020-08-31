import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { GatewayData, Gateway, GatewayRequest } from 'src/app/models/gateway';

@Injectable({
  providedIn: 'root'
})
export class ChirpstackGatewayService {

  private chripstackGatewayUrl: string = 'chirpstack/gateway'

  constructor(private restService: RestService) { }

  public get(id: string = null, params = {}): Observable<any> {
    return this.restService.get(this.chripstackGatewayUrl, params, id);
  }

  public post(gateway: Gateway): Observable<GatewayData> {
    var gatewayRequest: GatewayRequest = new GatewayRequest;
    gatewayRequest.gateway = gateway
    return this.restService.post(this.chripstackGatewayUrl, gatewayRequest, {observe: 'response'});
  }

  public put(gateway: Gateway, id: string): Observable<GatewayData> {
    return this.restService.replace(this.chripstackGatewayUrl, gateway, id)
  }

  public delete(id: string): Observable<any> {
    return this.restService.delete(this.chripstackGatewayUrl, id);
  }
}
