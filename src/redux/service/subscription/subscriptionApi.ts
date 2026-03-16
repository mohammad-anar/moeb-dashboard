import { baseApi } from "@/redux/api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionPaymentUrl: builder.mutation({
      query: (data) => ({
        url: "/subscription/checkout",
        method: "POST",
        body: data,
      }),
    }),
    sendEmail: builder.mutation({
      query: (userId: string) => ({
        url: `/user/${userId}/send-subscription-email`, 
        method: "POST",
      }),
    }),
  }),
});

export const { useGetSubscriptionPaymentUrlMutation, useSendEmailMutation } = subscriptionApi;
