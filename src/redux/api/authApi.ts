import { tagTypes } from "../tagTypes/tagTypes";
import { baseApi } from "./baseApi";
const AUTH_URL = "/user";

interface ILoginPayload {
  email: string;
  password: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // user sign-up api endpoint
    signUp: build.mutation({
      query: (
        signUpData: ILoginPayload & {
          name: string;
          role?: "user" | "driver";
        }
      ) => ({
        url: `${AUTH_URL}/sign-up`,
        method: "POST",
        body: signUpData,
      }),
      invalidatesTags: [tagTypes.USER],
    }),
    // user sign-in api
    login: build.mutation({
      query: (loginData: ILoginPayload) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.USER],
    }),
    verifyLogin: build.mutation({
      query: (loginData: ILoginPayload) => ({
        url: `${AUTH_URL}/verify-login`,
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: [tagTypes.USER],
    }),

    getUser: build.query({
      query: (userId: string) => ({
        url: `${AUTH_URL}/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.USER],
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation, useVerifyLoginMutation } =
  authApi;
