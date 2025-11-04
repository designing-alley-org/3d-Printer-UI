import { FileDataDB } from "./uploadFiles";


export interface Discount {
  orderId: string;
  code: string;
  _id: string;
  percentage: number;
  isUserAccepted: boolean;
  isUsed: boolean;
  expiryDate?: string;
}



export type PriceTableProps = {
  subtotal: number;
  orderId: string;
  orderNumber: string;
  taxes: number;
  taxRate: number;
  useDiscount?: boolean;
  discountAvailable?: Discount;
  fileTable: (FileDataDB & {
    fileId: string;
    pricePerUnit: number;
    totalPrice: number;
  })[];
};