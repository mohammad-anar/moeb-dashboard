import { baseApi } from "@/redux/api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPaymentUrl: builder.mutation({
      query: (data) => ({
        url: "/subscriptions/purchase", // Placeholder endpoint, might need adjustment based on real API
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSubscriptionPaymentUrlMutation } = subscriptionApi;
