export type Irazresponse = {
    id: string;
    entity: string;
    amount: number | string;
    amount_paid: number;
    amount_due: number;
    currency: string;
    receipt?: string;
    status: string;
    attempts: number;
    created_at: number;
  };