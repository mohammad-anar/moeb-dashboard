import { baseApi } from "@/redux/api/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: (params) => ({
        url: "/notifications/admin",
        method: "GET",
        params,
      }),
      providesTags: ["Notification"],
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: "/notifications/admin/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
    markSingleAsRead: builder.mutation({
      query: (notificationId) => ({
        url: `/notifications/admin/${notificationId}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetAllNotificationQuery,
  useMarkAllAsReadMutation,
  useMarkSingleAsReadMutation,
} = notificationApi;
