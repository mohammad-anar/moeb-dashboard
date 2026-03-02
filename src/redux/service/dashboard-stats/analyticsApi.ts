import { baseApi } from "@/redux/api/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStats: builder.query({
      query: (params) => ({
        url: "/dashboard/stats",
        method: "GET",
        params,
      }),
      providesTags: ["Auth", "User"],
    }),
    getMonthlyTrends: builder.query({
      query: (params) => ({
        url: "/dashboard/monthly-trends",
        method: "GET",
        params,
      }),
      providesTags: ["Auth", "User"],
    }),
  }),
});

export const { useGetAllStatsQuery, useGetMonthlyTrendsQuery } = dashboardApi;
