import getBaseUrl from "@/helpers/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypeList } from "../tagTypes/tagTypes";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl() as string,
    // prepareHeaders: async (headers) => {
    //   // Get the token from the state (assuming you have it stored in the Redux state)
    //   const session = await getSession();

    //   // If we have a token, set the Authorization header
    //   if (session) {
    //     headers.set("Authorization", `Bearer ${session.user.accessToken}`);
    //   }

    //   return headers;
    // },
  }),

  endpoints: () => ({}),
  tagTypes: tagTypeList,
});
export default baseApi;
