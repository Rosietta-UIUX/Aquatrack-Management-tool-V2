import { api } from "./apiSlice";

const employeeApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Employee"],
});

const employeeApi = employeeApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: ({ farmId, params }) =>
        `/farmer/${farmId}/employee?page=${params}`,
      providesTags: ["Employee"],
    }),
    createEmployee: builder.mutation({
      query: ({ formdata, farmId }) => ({
        url: `/farmer/${farmId}/employee`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Employee"],
    }),
    editEmployee: builder.mutation({
      query: ({ formdata, farmId, employeeId }) => ({
        url: `/farmer/${farmId}/employee/${employeeId}`,
        method: `PATCH`,
        body: formdata,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: ({ farmId, employeeId }) => ({
        url: `/farmer/${farmId}/employee/${employeeId}`,
        method: `DELETE`,
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation,
  useEditEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
