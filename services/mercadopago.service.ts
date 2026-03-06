import { fetcher } from "../lib/api";
import { CreatePaymentLinkResponse } from "../types/orders";

export const mercadoPagoService = {
  createPaymentLink: (orderId: number) =>
    fetcher<CreatePaymentLinkResponse>(`/mercadopago/${orderId}`, {
      method: "POST",
    }),
};
