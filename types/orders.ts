export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED"
  | string;

export type PaymentStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "IN_PROCESS"
  | "REFUNDED"
  | string;

export interface OrderProductSummary {
  nombre: string;
  cantidad: number;
  precio?: number;
  precioUnitario?: number;
  subtotal?: number;
  color?: string | null;
  size?: string | null;
  image?: string | null;
  description?: string | null;
}

export interface OrderSummary {
  id: number;
  user?: string;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  total: number;
  createdAt: string;
  updatedAt?: string;
  productos: OrderProductSummary[];
}

export interface CreateOrderResponse {
  message: string;
  order: OrderSummary;
  [key: string]: unknown;
}

export interface CreatePaymentLinkResponse {
  message: string;
  init_point?: string;
}
