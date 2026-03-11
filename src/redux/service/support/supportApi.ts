import { baseApi } from "@/redux/api/baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSupport: builder.query({
      query: (params) => ({
        url: "/supports",
        method: "GET",
        params,
      }),
      providesTags: ["Support"],
    }),

    getSupportById: builder.query({
      query: (id) => ({
        url: `supports/${id}`,
        method: "GET",
      }),
      providesTags: ["Support"],
    }),

    replySupport: builder.query({
      query: (id) => ({
        url: `supports/${id}/messages`,
        method: "GET",
      }),
      providesTags: ["Support"],
    }),

    deleteTerms: builder.mutation({
      query: (slug) => ({
        url: `/supports/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Support"],
    }),
  }),
});

export const {
  useGetAllSupportQuery,
  useGetSupportByIdQuery,
  useReplySupportQuery,
  useDeleteTermsMutation,
} = supportApi;
