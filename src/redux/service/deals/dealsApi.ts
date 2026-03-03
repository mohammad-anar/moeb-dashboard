import { baseApi } from "@/redux/api/baseApi";

const dealsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDealsStats: builder.query({
      query: (params) => ({
        url: "/dashboard/offer-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Deals"],
    }),
    getAllDeals: builder.query({
      query: (params) => ({
        url: "/deals/admin/all",
        method: "GET",
        params,
      }),
      providesTags: ["Deals"],
    }),
    getDealsById: builder.query({
      query: (id) => ({
        url: `/deals/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Deals"],
    }),
    createDeals: builder.mutation({
      query: (data) => ({
        url: `/deals`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Deals"],
    }),
    updateDeals: builder.mutation({
      query: ({ id, data }) => ({
        url: `/deals/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Deals"],
    }),
    deleteDeals: builder.mutation({
      query: (id) => ({
        url: `/deals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Deals"],
    }),
  }),
});

export const {
  useGetDealsStatsQuery,
  useCreateDealsMutation,
  useGetAllDealsQuery,
  useGetDealsByIdQuery,
  useUpdateDealsMutation,
  useDeleteDealsMutation,
} = dealsApi;
