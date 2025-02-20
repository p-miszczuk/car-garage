/* eslint-disable */
declare module "next-auth" {
  type User = {
    id: number;
    email: string;
    name: string;
    password?: string;
  };
}
