import { baseApi } from "@/redux/api/baseApi";

const marketPlaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarketPlaceStats: builder.query({
      query: (params) => ({
        url: "/dashboard/marketplace-stats",
        method: "GET",
        params,
      }),
      providesTags: ["MarketPlace"],
    }),
    getAllMarketPlace: builder.query({
      query: (params) => ({
        url: "/items",
        method: "GET",
        params,
      }),
      providesTags: ["MarketPlace"],
    }),
    getMarketPlaceDataById: builder.query({
      query: (id) => ({
        url: `/items/${id}`,
        method: "GET",
      }),
      providesTags: ["MarketPlace"],
    }),
    updateMarketPlace: builder.mutation({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["MarketPlace"],
    }),
    deleteMarketPlace: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MarketPlace"],
    }),
  }),
});

export const {
    useGetMarketPlaceStatsQuery,
    useGetAllMarketPlaceQuery,
    useGetMarketPlaceDataByIdQuery,
    useUpdateMarketPlaceMutation,
    useDeleteMarketPlaceMutation,
    
} = marketPlaceApi;
