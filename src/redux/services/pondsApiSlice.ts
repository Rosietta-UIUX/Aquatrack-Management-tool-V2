import { api } from "./apiSlice";

const pondApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Ponds", "MortalityLogs", "DailyReport", "FeedLogs", "AllLogs"],
});

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
    getMortalityLogs: builder.query({
      query: ({ farmId, pondId }) =>
        `/farmer/${farmId}/pond/${pondId}/mortality-logs`,
      providesTags: ["MortalityLogs"],
    }),
    getAllLogs: builder.query({
      query: ({ farmId, startDate, endDate }) => {
        let url = `/farmer/${farmId}/all-logs`;
        if (startDate && endDate) {
          url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        return url;
      },
      providesTags: ["AllLogs"],
    }),
    getDailyReport: builder.query({
      query: ({ farmId, startDate, endDate }) => {
        let url = `/farmer/${farmId}/daily-report`;
        if (startDate && endDate) {
          url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        return url;
      },
      providesTags: ["DailyReport"],
    }),
    addMortalityLog: builder.mutation({
      query: ({ formdata, farmId, pondId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/mortality-logs`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport", "AllLogs"],
    }),
    editMortalityLog: builder.mutation({
      query: ({ formdata, farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/mortality-logs/${logId}`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport", "AllLogs"],
    }),
    deleteMortalityLog: builder.mutation({
      query: ({ farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/mortality-logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport", "AllLogs"],
    }),
    addFeedLog: builder.mutation({
      query: ({ formdata, farmId, pondId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/feed-logs`,
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["FeedLogs", "Ponds", "DailyReport", "AllLogs"],
    }),
    editFeedLog: builder.mutation({
      query: ({ formdata, farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/feed-logs/${logId}`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: ["FeedLogs", "Ponds", "DailyReport", "AllLogs"],
    }),
    deleteFeedLog: builder.mutation({
      query: ({ farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/feed-logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeedLogs", "Ponds", "DailyReport", "AllLogs"],
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
  useGetMortalityLogsQuery,
  useGetAllLogsQuery,
  useGetDailyReportQuery,
  useAddMortalityLogMutation,
  useEditMortalityLogMutation,
  useDeleteMortalityLogMutation,
  useAddFeedLogMutation,
  useEditFeedLogMutation,
  useDeleteFeedLogMutation,
} = pondApi;
