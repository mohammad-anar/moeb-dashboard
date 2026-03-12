import { baseApi } from "@/redux/api/baseApi";

const chatApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createChat: builder.mutation({
      query: (body) => ({
        url: "/chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Support"],
    }),
    sendMessage: builder.mutation({
      query: ({ chatId, body }) => ({
        url: `/messages/${chatId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Support"],
    }),
    getChatMessages: builder.query({
      query: (chatId) => ({
        url: `/messages/${chatId}`,
        method: "GET",
      }),
      providesTags: ["Support"],
    }),
  }),
});

export const {
  useCreateChatMutation,
  useGetChatMessagesQuery,
  useSendMessageMutation,
} = chatApi;
