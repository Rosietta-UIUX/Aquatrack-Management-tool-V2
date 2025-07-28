import { api } from "./apiSlice";

const batchApiConfig = api.enhanceEndpoints({ addTagTypes: ["Batchs"] });

const batchApi = batchApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllBatchs: builder.query({
      query: ({ farmId, params, filter }) =>
        `/farmer/${farmId}/fetch-all-batches?search=${params}`,
      providesTags: ["Batchs"],
      keepUnusedDataFor: 30,
    }),
    getAllBatchsData: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/batch`,
      providesTags: ["Batchs"],
      keepUnusedDataFor: 30,
    }),
    getInStockBatchsData: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/batch?filter[status]=in stock`,
      providesTags: ["Batchs"],
    }),
    getAllBatchsStat: builder.query({
      query: ({ farmId }) => `/farmer/batchs/${farmId}/farm-statistics`,
      providesTags: ["Batchs"],
    }),
    getSingleBatchsStat: builder.query({
      query: ({ batchId, farmId }) => `/farmer/${farmId}/batch/${batchId}`,
      providesTags: ["Batchs"],
    }),
    createBatch: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/batch`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Batchs"],
    }),
    editBatch: builder.mutation({
      query: ({ formdata, farmId, batchId }) => ({
        url: `/farmer/${farmId}/batch/${batchId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Batchs"],
    }),
    deleteBatch: builder.mutation({
      query: ({ farmId, batchId }) => ({
        url: `/farmer/${farmId}/batch/${batchId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Batchs"],
    }),
    deleteAllBatch: builder.mutation({
      query: ({ formdata }) => ({
        url: `/farmer/delete-all`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Batchs"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllBatchsQuery,
  useGetSingleBatchsStatQuery,
  useGetAllBatchsDataQuery,
  useGetInStockBatchsDataQuery,
  useCreateBatchMutation,
  useEditBatchMutation,
  useDeleteBatchMutation,
  useDeleteAllBatchMutation,
} = batchApi;
