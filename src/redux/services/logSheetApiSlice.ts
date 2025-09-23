import { api } from "./apiSlice";

const logSheetApiConfig = api.enhanceEndpoints({
  addTagTypes: ["LogSheet"],
});

const logSheetApi = logSheetApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getLogExpenses: builder.query({
      query: ({ farmId, startDate, endDate, tag }) => {
        const params = new URLSearchParams();
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);
        if (tag) params.append("tag", tag);
        return `/farmer/${farmId}/log-sheet?${params.toString()}`;
      },
      providesTags: ["LogSheet"],
    }),
    createLogExpense: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/log-sheet`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["LogSheet"],
    }),
    getTodaysLogExpensesSummary: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/log-sheet/summary/today`,
      providesTags: ["LogSheet"],
    }),
    getMonthlyLogExpensesSummary: builder.query({
      query: ({ farmId }) => `/farmer/${farmId}/log-sheet/summary/month`,
      providesTags: ["LogSheet"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetLogExpensesQuery,
  useCreateLogExpenseMutation,
  useGetTodaysLogExpensesSummaryQuery,
  useGetMonthlyLogExpensesSummaryQuery,
} = logSheetApi;
