


export type Commit = {
  commitMessageDetails : string;
  label:string;
  saturdayDelivery:boolean;
}

export type RatedShipmentDetails = {
  currency:string;
  rateType:string;
  totalBaseCharge:number;
  totalNetCharge:number;
}

export interface DeliveryData {
  commit: Commit;
  ratedShipmentDetails: RatedShipmentDetails[];
  packagingType: string;
  serviceName: string;
  serviceType: string;
}