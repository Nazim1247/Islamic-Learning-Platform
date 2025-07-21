import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import GoogleProvider from "next-auth/providers/google";
import { saveUserToDB } from "@/lib/saveUser";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const usersCollection = dbConnect(collectionNameObj.userCollection);

          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("No user found with this email.");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Incorrect password.");
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image || null,
          };
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      try {
        await saveUserToDB(user);
      } catch (error) {
        console.error("Error saving user:", error);
      }
      return true;
    }
  },

  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
