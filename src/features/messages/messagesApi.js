import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            // kono conversation e press korle .. shei conversation er id already available ase .. shei id ta amra
            // ekhane pass kore dibo
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${process.env.REACT_APP_MESSAGES_PER_PAGE}`,
            // db.json e dekhlam conversationId akare ase
        }),
        // ekhon amra ei messages API ta amra use korte parbo .. amader right side er area ta te .. Chat Body
        // te .. UI te.. Component e .. ekhon ei query ta amra kothay korbo ..
        addMessage: builder.mutation({
            // Message Insert korar jonno ..
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
