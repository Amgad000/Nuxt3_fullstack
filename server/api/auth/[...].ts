// file: ~/server/api/auth/[...].ts
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import usersModel from "~/server/models/users.model";
import mongoClient from "~/server/lib/mongo";
const config = useRuntimeConfig();

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: config.authSecret,

  pages: {
    signIn: "/login",
  },

  adapter: MongoDBAdapter(mongoClient),
  session: { strategy: "jwt" },

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: "Credentials",
      async authorize(credentials: any) {
        const foundedUser = await usersModel.findOne({
          email: credentials?.email,
        });

        if (foundedUser) {
          console.log("foundedUser:Email is correct");
        }
        if (credentials?.password == foundedUser?.password) {
          return foundedUser;
        } else {
          console.error("Bad credentials : Passwords don't match");
          return null;
        }
      },
    }),

    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: "93cafb5ec070f44dcfc8",
      clientSecret: "aa360506fc8e5b16b17dba3c2f24942b71d832bc",
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        // the credential user has the mongo _id
        if ((user as any)._id) {
          token.id = (user as any)._id;
        } else {
          // the Oauthuser has id
          token.id = (user as any).id;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      (session as any).id = token.id;

      return session;
    },
  },
});
