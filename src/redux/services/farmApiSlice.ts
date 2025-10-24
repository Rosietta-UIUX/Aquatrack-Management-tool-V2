import { api } from "./apiSlice";

interface Farm {
  formdata: {
    date_established: string;
    location: string;
    name: string;
    no_of_ponds: number;
  };
}

const farmApiConfig = api.enhanceEndpoints({ addTagTypes: ["Farms"] });

const farmApi = farmApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getAllFarms: builder.query({
      query: () => `/farmer/farms`,
      providesTags: ["Farms"],
    }),
    getFarmData: builder.query({
      query: ({ farmId }) => {
        if (!farmId) {
          return "";
        }
        return `/farmer/${farmId}/dashboard`;
      },
      providesTags: ["Farms"],
    }),
    createFarm: builder.mutation<void, any>({
      query: ({ formdata }) => ({
        url: `/farmer/farms`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Farms"],
    }),
    editFarm: builder.mutation<void, any>({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/farms/${farmId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Farms"],
    }),
    editOrganization: builder.mutation<void, any>({
      query: ({ formdata, orgId }) => ({
        url: `/update-organization/${orgId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Farms"],
    }),
    deleteFarm: builder.mutation<void, any>({
      query: ({ farmId }) => ({
        url: `/farmer/farms/${farmId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Farms"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllFarmsQuery,
  useGetFarmDataQuery,
  useCreateFarmMutation,
  useEditFarmMutation,
  useDeleteFarmMutation,
  useEditOrganizationMutation,
} = farmApi;
