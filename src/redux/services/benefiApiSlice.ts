import { api } from "./apiSlice";

const benefiApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Beneficiaries"],
});

const benefiApi = benefiApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getBeneficiaries: builder.query({
      query: ({ farmId }) => `farmer/${farmId}/beneficiaries`,
      providesTags: ["Beneficiaries"],
      keepUnusedDataFor: 30,
    }),
    // AddBeneficiary: builder.mutation({
    //   query: ({ formdata, farmId }) => ({
    //     url: `/farmer/${farmId}/beneficiary`,
    //     method: `POST`,
    //     body: formdata,
    //   }),
    //   invalidatesTags: ["Beneficiaries"],
    // }),
  }),
  overrideExisting: true,
});

export const { useGetBeneficiariesQuery } = benefiApi;
