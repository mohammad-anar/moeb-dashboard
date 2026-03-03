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
    getAllDrivers: builder.query({
      query: (params) => ({
        url: "/user",
        method: "GET",
        params,
      }),
      providesTags: ["Driver"],
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: "GET",
      }),
      providesTags: ["Driver"],
    }),
    getUserDetailsById: builder.query({
      query: (id) => ({
        url: `user/${id}/user`,
        method: "GET",
      }),
      providesTags: ["Driver"],
    }),
    deleteDriver: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/dashboard/driver/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Driver"],
    }),
    blockUser: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/user/${id}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["Driver"],
    }),
    unBlockUser: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/user/${id}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["Driver"],
    }),
    approveUser: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/user/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Driver"],
    }),
  }),
});

export const {
  useGetDriverStatsQuery,
  useGetAllDriversQuery,
  useGetUserByIdQuery,
  useGetUserDetailsByIdQuery,
  useApproveUserMutation,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useDeleteDriverMutation,
} = driverApi;
