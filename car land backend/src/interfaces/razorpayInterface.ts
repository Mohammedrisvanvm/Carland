import { IMap } from "razorpay/dist/types/api";

export interface RazorpayRefund {
    id: string;
    entity: string;
    amount?: number;
    currency: string;
    payment_id: string;
    notes?: IMap<string | number>;
    receipt?: string;
    acquirer_data?: {
      rrn?: string;
    };
    created_at: number;
    batch_id?: string;
    status: string;
    speed_processed: string;
    speed_requested: string;
  }