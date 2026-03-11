import { baseApi } from "@/redux/api/baseApi";

const termsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTerms: builder.mutation({
      query: (data) => ({
        url: "/legals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    getAllTerms: builder.query({
      query: (params) => ({
        url: "/legals",
        method: "GET",
        params,
      }),
      providesTags: ["Terms"],
    }),
    getTermsBySlug: builder.query({
      query: (slug) => ({
        url: `legals/${slug}`,
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),

    updateTerms: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/legals/${slug}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    deleteTerms: builder.mutation({
      query: (slug) => ({
        url: `/service-areas/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Terms"],
    }),
  }),
});

export const {
  useCreateTermsMutation,
  useGetAllTermsQuery,
  useGetTermsBySlugQuery,
  useUpdateTermsMutation,
  useDeleteTermsMutation,
} = termsApi;
