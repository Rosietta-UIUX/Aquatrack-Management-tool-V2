import { api } from "./apiSlice";

const subApiConfig = api.enhanceEndpoints({ addTagTypes: ["Sub"] });

const subApi = subApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getSubs: builder.query({
      query: () => ({
        url: `/farmer/get-premium-plan`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Sub"],
    }),
    getSubscriptionStatus: builder.query({
      query: ({ farmId }) => {
        if (!farmId) {
          return {
            url: "",
          };
        }
        return {
          url: `/farmer/${farmId}/check-subscription-status`,
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Sub"],
    }),
    getBuillingRecords: builder.query({
      query: () => ({
        url: `/farmer/billing-history`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Sub"],
    }),
    createSub: builder.mutation({
      query: ({ formdata }) => ({
        url: `/subscription-plan`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Sub"],
    }),
    activateAutoRenewal: builder.mutation({
      query: ({ formdata }) => ({
        url: `/farmer/activate-renewal`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Sub"],
    }),
    editSub: builder.mutation({
      query: ({ formdata, subid }) => ({
        url: `/subscription-plan/${subid}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Sub"],
    }),
    deleteSub: builder.mutation({
      query: ({ subid }) => ({
        url: `/subscription-plan/${subid}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Sub"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSubscriptionStatusQuery,
  useGetSubsQuery,
  useGetBuillingRecordsQuery,
  useCreateSubMutation,
  useEditSubMutation,
  useActivateAutoRenewalMutation,
  useDeleteSubMutation,
} = subApi;
