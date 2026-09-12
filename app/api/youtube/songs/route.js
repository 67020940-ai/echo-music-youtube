import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ย้าย authOptions มาไว้ที่นี่เลย เพื่อป้องกัน Error การหาไฟล์ไม่เจอ
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.readonly",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&mine=true&maxResults=50`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    const data = await res.json();
    
    const songs = data.items ? data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.videoOwnerChannelTitle || "Unknown Artist",
      genre: "Analyzed",
      mood: "Real-time"
    })) : [];

    return NextResponse.json({ songs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
