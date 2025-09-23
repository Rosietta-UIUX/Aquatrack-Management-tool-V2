import { api } from "./apiSlice";

const pondApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Ponds", "MortalityLogs", "DailyReport"],
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
    getAllMortalityLogs: builder.query({
      query: ({ farmId, startDate, endDate }) => {
        let url = `/farmer/${farmId}/mortality-logs`;
        if (startDate && endDate) {
          url += `?start_date=${startDate}&end_date=${endDate}`;
        }
        return url;
      },
      providesTags: ["MortalityLogs"],
    }),
    getDailyReport: builder.query({
      query: ({ farmId, date }) => {
        let url = `/farmer/${farmId}/daily-report`;
        if (date) {
          url += `?date=${date}`;
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
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport"],
    }),
    editMortalityLog: builder.mutation({
      query: ({ formdata, farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/mortality-logs/${logId}`,
        method: "PATCH",
        body: formdata,
      }),
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport"],
    }),
    deleteMortalityLog: builder.mutation({
      query: ({ farmId, pondId, logId }) => ({
        url: `/farmer/${farmId}/pond/${pondId}/mortality-logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MortalityLogs", "Ponds", "DailyReport"],
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
  useGetAllMortalityLogsQuery,
  useGetDailyReportQuery,
  useAddMortalityLogMutation,
  useEditMortalityLogMutation,
  useDeleteMortalityLogMutation,
} = pondApi;
