import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // ดึงรายการ Playlist "Liked Videos" หรือ "Favorites" ของผู้ใช้
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&mine=true&maxResults=50`,
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
    const data = await res.json();
    
    const songs = data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.videoOwnerChannelTitle || "Unknown Artist",
      genre: "Analyzed", // ในขั้นแรกจะใช้เป็น Analyzed ก่อน
      mood: "Real-time"
    }));

    return NextResponse.json(songs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
