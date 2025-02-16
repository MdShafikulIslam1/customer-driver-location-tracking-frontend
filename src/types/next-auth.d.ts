import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    _id: string;
    name?: string;
    role?: string;
    email?: string;
    accessToken?: string;
  }
  interface Session {
    user: {
      _id: string;
      name?: string;
      role?: string;
      email?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    _id: string;
    name?: string;
    role?: string;
    email?: string;
    accessToken?: string;
  }
}
