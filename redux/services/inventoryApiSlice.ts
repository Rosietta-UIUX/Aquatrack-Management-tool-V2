import { api } from "./apiSlice";

const inventoryApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Inventory"],
});

const inventoryApi = inventoryApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/harvest`,
      providesTags: ["Inventory"],
    }),
    // getHarvestStat: builder.query({
    //   query: ({ farmId }) => `/farmer/batchs/${farmId}/farm-statistics`,
    //   providesTags: ["Harvest"],
    // }),
    // createPurchase: builder.mutation({
    //   query: ({ formdata, farmId }) => ({
    //     url: `/farmer/${farmId}/harvest`,
    //     method: `POST`,
    //     body: formdata,
    //   }),
    //   invalidatesTags: ["Inventory"],
    // }),
    editHarvest: builder.mutation({
      query: ({ formdata, farmId, taskId }) => ({
        url: `/farmer/${farmId}/harvest/${taskId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Inventory"],
    }),
    deleteHarvest: builder.mutation({
      query: ({ farmId, batchId }) => ({
        url: `/farmer/${farmId}/harvest/${batchId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Inventory"],
    }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetInventoryQuery,
  // useCreatePurchaseMutation,
  useEditHarvestMutation,
  useDeleteHarvestMutation,
} = inventoryApi;
