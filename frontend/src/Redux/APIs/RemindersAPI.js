import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ReminderAPI = createApi({
  reducerPath: "ReminderAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/me/" }),
  endpoints: (builder) => ({
    getUserReminders: builder.query({ query: () => "reminders" }),

    getUserSingleReminder: builder.query({ query: (id) => `reminders/${id}` }),

    createUserReminder: builder.mutation({
      query: (body) => ({
        url: "reminders",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.data,
    }),

    deleteUserReminder: builder.mutation({
      query: (id) => ({
        url: `reminders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserRemindersQuery,
  useGetUserSingleReminderQuery,
  useCreateUserReminderMutation,
  useDeleteUserReminderMutation,
} = ReminderAPI;
