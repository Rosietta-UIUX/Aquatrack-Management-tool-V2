import { api } from "./apiSlice";

const notificationApiConfig = api.enhanceEndpoints({
  addTagTypes: ["Notifications"],
});

const notificationApi = notificationApiConfig.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => `/notifications`,
      providesTags: ["Notifications"],
      keepUnusedDataFor: 5,
    }),
    readNotification: builder.mutation({
      query: () => ({
        url: `/notifications/mark-all-as-read`,
        method: `POST`,
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetNotificationsQuery, useReadNotificationMutation } =
  notificationApi;
