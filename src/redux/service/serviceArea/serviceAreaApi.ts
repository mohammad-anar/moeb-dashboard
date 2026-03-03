import { baseApi } from "@/redux/api/baseApi";

const marketPlaceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServiceArea: builder.mutation({
      query: (data) => ({
        url: "/service-areas",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ServiceArea"],
    }),
    getAllServiceArea: builder.query({
      query: (params) => ({
        url: "/service-areas",
        method: "GET",
        params,
      }),
      providesTags: ["ServiceArea"],
    }),
    getServiceAreaById: builder.query({
      query: (id) => ({
        url: `/service-areas/${id}`,
        method: "GET",
      }),
      providesTags: ["ServiceArea"],
    }),
    getAllCities: builder.query({
      query: (id) => ({
        url: `/service-areas/cities`,
        method: "GET",
      }),
      providesTags: ["ServiceArea"],
    }),
    updateServiceArea: builder.mutation({
      query: ({ id, data }) => ({
        url: `/service-areas/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ServiceArea"],
    }),
    deleteServiceArea: builder.mutation({
      query: (id) => ({
        url: `/service-areas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ServiceArea"],
    }),
  }),
});

export const {
  useCreateServiceAreaMutation,
  useGetAllServiceAreaQuery,
  useGetServiceAreaByIdQuery,
  useGetAllCitiesQuery,
  useUpdateServiceAreaMutation,
  useDeleteServiceAreaMutation,
} = marketPlaceApi;
