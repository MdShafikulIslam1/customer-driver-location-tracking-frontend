import "next-auth";
import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface User {
    id: string;
    _id: string;
    name?: string;
    role?: string;
    email?: string;
    accessToken?: string;
  }
  interface Session {
    user: {
      id: string;
      _id: string;
      name?: string;
      role?: string;
      email?: string;
      accessToken?: string;
    } & DefaultSession["user"];
  }
  interface JWT {
    id: string;
    _id: string;
    name?: string;
    role?: string;
    email?: string;
    accessToken?: string;
  }
}
