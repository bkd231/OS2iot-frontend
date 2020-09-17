import { PayloadDecoder } from '../../payload-decoder/payload-decoder.model';
import { Application } from '../../models/application';

export class Organisation {
  id?: number;
  name: string;
}

export interface OrganisationResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;

  payloadDecoders: PayloadDecoder[];
  applications: Application[];
  // TODO: This.
  permissions: any[];
}

export interface OrganisationGetManyResponse {
  data: OrganisationResponse[];
  count: number;
}
