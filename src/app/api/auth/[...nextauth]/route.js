import User from "@/models/User";
import connectDB from "@/models/connectDB";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email Address", type: "email" },
        phone: { label: "Phone Number", type: "number" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // connect to the database
        console.log("initializing user");
        let user;

        console.log("credetials submitted into all route api: ", {email: credentials.email, phone: credentials.phone, pwd: credentials.password})

        // check if email or phone and password is entered
        if (
          !((credentials.email || credentials.phone) && credentials.password)
        ) {
          throw new Error("Please enter email/phone and password");
        }
        console.log("credentials submitted passed...");

        // connect to database
        await connectDB();
        if (credentials.email) {
          user = User.findOne({ email: credentials.email });
        } else if (credentials.phone) {
          user = User.findOne({ phone: credentials.phone });
        }
        // if no user was found
        if (!user || !user.hashedPwd) {
          throw new Error("No user found");
        }

        // check if password exist
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPwd
        );
        if (!passwordMatch) {
          throw new Error("Incorrect Password");
        }

        // if user found and passwords matched
        return user;
      },
    }),
  ],
  // callbacks: {
  //   async jwt({ token, user, session }) {
  //     console.log("jwt callback:", { token, user, session });
  //     if (user) return { ...token, id: user.id };
  //     return token;
  //   },
  //   async session({ session, token, user }) {
  //     console.log("session callback:", { session, token, user });
  //     // pass in user id to the session
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //       },
  //     };
  //     return session;
  //   },
  // },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
