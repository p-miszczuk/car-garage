import { DefaultSession } from "next-auth/next";
// eslint-disable @typescript-eslint/no-unused-vars
declare module "next-auth" {
  interface Session {
    user: { id: string } & DefaultSession["user"];
  }
}
