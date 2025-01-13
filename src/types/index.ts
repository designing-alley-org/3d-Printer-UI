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