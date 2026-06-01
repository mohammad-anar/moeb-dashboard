import { baseApi } from "@/redux/api/baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: ({ page, limit, searchTerm, serviceArea, companyName, rideStatus }) => ({
        url: "/jobs/admin/all-jobs",
        method: "GET",
        params: { page, limit, searchTerm, serviceArea, companyName, rideStatus },
      }),
      providesTags: ["Job"],
    }),
    deleteJob: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
  }),
});

export const { useGetAllJobsQuery, useDeleteJobMutation } = jobApi;
