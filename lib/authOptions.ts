import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
import * as bcrypt from "bcrypt";
import { User } from "@prisma/client";

// @ts-ignore-unused-export
export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth",
  },
  //   session: {
  //     strategy: "jwt",
  //   },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    //   idToken: true,

    //   authorization: {
    //     params: {
    //       scope: "openid profile email",
    //     },
    //   },
    // }),
    CredentialsProvider({
      name: "credentials",

      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        if (!user) throw new Error("User name or password is not correct");

        // This is Naive Way of Comparing The Passwords
        // const isPassowrdCorrect = credentials?.password === user.password;
        if (!credentials?.password)
          throw new Error("Please Provide Your Password");
        const isPassowrdCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPassowrdCorrect)
          throw new Error("User name or password is not correct");

        // if (!user.emailVerified)
        //   throw new Error("Please verify your email first!");

        // eslint-disable-next-line no-unused-vars
        const { password: _password, ...userWithoutPass } = user;
        return { ...userWithoutPass };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }: { token: any; session: any }) {
      session.user = token.user;
      return session;
    },
  },
};
