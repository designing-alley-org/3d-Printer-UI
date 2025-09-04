export interface OrderFileType {
    id: number;
    name: string;
    quantity: number;
    pricing: number;
    fileName: string;
  }
  export interface PricingDetailType {
    label: string;
    value: string | number;
    pricePerUnit: number;
    total: number;
    icon: string;
  }
  
  export interface PricingSummaryType {
    quantity: number;
    taxes: number;
    total: number;
  }
  
  export interface OrderFileProps {
    fileName: string;
    quantity: number;
    pricing: number;
    file:any;
  }


export interface User {
    _id: string;
    email: string;
    name: string;
    phone_no: string;
    phone_ext: string;
    token?: string;
}

export type editUser = Omit<User,'email' | '_id' | 'token'>;

export type EditMail = Partial<Pick<User, 'email'>>;