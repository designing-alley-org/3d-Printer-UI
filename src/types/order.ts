import { Address } from "./address";
import { Discount } from "./priceChart";
import { DeliveryService } from "./uploadFiles";

export interface ShipmentCreated {
    created: boolean;
    _id: string | null;
    status: string | null;
    trackingId: string | null;
    carrierCode: string | null;
    shipDatestamp: string | number | null;
    labelUrl: string | null;
}

export interface UserRef {
    _id: string;
    name: string;
}

export type Files = {
    fileId: string;
    fileName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}

export interface Weight {
    unit: string;
    weight: number;
}



export interface PaymentStatus {
    exists: boolean;
    status: string | null;
    amount: number | null;
    currency: string | null;
}

export interface DiscountSummary extends Discount {
    applicable?: boolean;
    discountAmount: number;
}

export interface Order {
    _id: string;
    order_status: string;
    createdBy?: UserRef;
    delivery_service?: DeliveryService | null;
    createdAt: string;
    address: Address | null;
    discount: DiscountSummary
    files: Files[];
    paymentStatus?: PaymentStatus | null;
    numberOfFiles?: number;
    taxRate?: number;
    subtotal?: number,
    discountAmount?: number,
    taxes?: number,
    total?: number,
    updatedBy?: UserRef | null;
    order_number?: string;
}
