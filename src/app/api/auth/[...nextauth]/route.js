import User from "@/models/User";
import connectDB from "@/models/connectDB";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID, // string (required) - The OAuth2 app
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // string (optional) - Client Secret for the OAuth
    }),
  ],
  callbacks: {
    async SignIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
          await connectDB();
          const isUserExists = await User.findOne({ email });

          if (!isUserExists) {
            const res = await fetch("/api/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name, email }),
            });
            if (res.success) {
              return user;
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
