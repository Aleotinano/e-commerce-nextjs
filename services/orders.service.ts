import { fetcher } from "../lib/api";
import { CreateOrderResponse } from "../types/orders";

export const orderService = {
  create: () =>
    fetcher<CreateOrderResponse>("/orders", {
      method: "POST",
    }),
};
