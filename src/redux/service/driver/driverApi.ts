import { baseApi } from "@/redux/api/baseApi";

const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverStats: builder.query({
      query: (params) => ({
        url: "/dashboard/driver-stats",
        method: "GET",
        params,
      }),
      providesTags: ["Driver"],
    }),
  }),
});

export const { useGetDriverStatsQuery } = driverApi;
