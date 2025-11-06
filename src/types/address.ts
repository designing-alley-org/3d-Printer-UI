export type Commit = {
  commitMessageDetails: string;
  label: string;
  saturdayDelivery: boolean;
};

export type RatedShipmentDetails = {
  currency: string;
  rateType: string;
  totalBaseCharge: number;
  totalNetCharge: number;
};

export interface DeliveryData {
  commit: Commit;
  ratedShipmentDetails: RatedShipmentDetails[];
  packagingType: string;
  serviceName: string;
  serviceType: string;
}


export interface Address {
  _id: string;
  userId: string;
  addressType: 'home' | 'office' | 'workshop' | 'other';
  personName: string;
  phoneNumber: string;
  email: string;
  streetLines: string[];
  city: string;
  postalCode: string;
  countryCode: string;
  createdAt: Date;
  updatedAt: Date;
  companyName?: string | null | undefined;
}