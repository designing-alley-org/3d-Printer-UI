import { FileDataDB } from "./uploadFiles";


export interface Discount {
  orderId: string;
  code: string;
  percentage: number;
  isUsed: boolean;
  expiryDate?: string;
}



export type PriceTableProps = {
  subtotal: number;
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