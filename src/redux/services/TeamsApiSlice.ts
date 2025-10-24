import { api } from "./apiSlice";

const teamApiConfig = api.enhanceEndpoints({ addTagTypes: ["Teams"] });

const teamApi = teamApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: () => `farmer/list-team-members`,
      providesTags: ["Teams"],
      keepUnusedDataFor: 5,
    }),
    inviteTeam: builder.mutation({
      query: ({ formdata }) => ({
        url: `/farmer/team-member-invitation`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Teams"],
    }),
    editTeamMember: builder.mutation({
      query: ({ formdata, userID }) => ({
        url: `/farmer/team-member-invitation/${userID}`,
        method: `POST`,
        body: formdata,
      }),
      invalidatesTags: ["Teams"],
    }),
    deleteTeamMember: builder.mutation({
      query: ({ formdata, userID }) => ({
        url: `/farmer/delete-team-member/${userID}`,
        method: `DELETE`,
        body: formdata,
      }),
      invalidatesTags: ["Teams"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTeamsQuery,
  useEditTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useInviteTeamMutation,
} = teamApi;
