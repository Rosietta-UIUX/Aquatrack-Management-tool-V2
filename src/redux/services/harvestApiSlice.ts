import { api } from "./apiSlice";

const harvestApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Harvest"],
});

const harvestApi = harvestApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllHarvest: builder.query({
      query: ({ farmId, params }) => `farmer/${farmId}/harvest?page=${params}`,
      providesTags: ["Harvest"],
    }),
    getHarvest: builder.query({
      query: ({ farmId, harvestId }) =>
        `farmer/${farmId}/harvest/${harvestId}`,
      providesTags: ["Harvest"],
    }),
    createHarvest: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `farmer/${farmId}/harvest`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Harvest"],
    }),

    editHarvest: builder.mutation({
      query: ({ formdata, farmId, taskId }) => ({
        url: `farmer/${farmId}/harvest/${taskId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Harvest"],
    }),

    editHarvestCus: builder.mutation({
      query: ({ formdata, farmId, harvestId }) => ({
        url: `farmer/${farmId}/harvest/${harvestId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Harvest"],
    }),

    deleteHarvest: builder.mutation({
      query: ({ farmId, batchId }) => ({
        url: `farmer/${farmId}/harvest/${batchId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Harvest"],
    }),
    deleteAllHarvest: builder.mutation({
      query: ({ formdata }) => ({
        url: `farmer/delete-all`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Harvest"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllHarvestQuery,
  useGetHarvestQuery,
  useCreateHarvestMutation,
  useEditHarvestMutation,
  useEditHarvestCusMutation,
  useDeleteHarvestMutation,
  useDeleteAllHarvestMutation,
} = harvestApi;
