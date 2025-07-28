import { api } from "./apiSlice";

const pondApiConfig = api.enhanceEndpoints({ addTagTypes: ["Ponds"] });

const pondApi = pondApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllPondsData: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/pond`,
      providesTags: ["Ponds"],
    }),
    getAllPondsStat: builder.query({
      query: ({ farmId }) => `/farmer/ponds/${farmId}/farm-statistics`,
      providesTags: ["Ponds"],
    }),
    createPond: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/pond`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Ponds"],
    }),
    editPond: builder.mutation({
      query: ({ formdata, farmId, pondId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Ponds"],
    }),
    deletePond: builder.mutation({
      query: ({ farmId, pondId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Ponds"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllPondsDataQuery,
  useGetAllPondsStatQuery,
  useCreatePondMutation,
  useEditPondMutation,
  useDeletePondMutation,
} = pondApi;
