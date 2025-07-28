import { api } from "./apiSlice";

const feedRecordApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Feeds"],
});

const feedRecordApi = feedRecordApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query({
      query: ({ farmId, params }) =>
        `/farmer/${farmId}/inventory?page=${params}`,
      providesTags: ["Feeds"],
    }),
    createFeed: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/inventory`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Feeds"],
    }),
    editFeed: builder.mutation({
      query: ({ formdata, farmId, feedId }) => ({
        url: `/farmer/${farmId}/inventory/${feedId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Feeds"],
    }),
    deleteFeed: builder.mutation({
      query: ({ farmId, feedId }) => ({
        url: `/farmer/${farmId}/inventory/${feedId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Feeds"],
    }),
    deleteAllFeeds: builder.mutation({
      query: ({ formdata }) => ({
        url: `/farmer/delete-all`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Feeds"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFeedsQuery,
  useCreateFeedMutation,
  useEditFeedMutation,
  useDeleteFeedMutation,
  useDeleteAllFeedsMutation,
} = feedRecordApi;
