"use client"
import React, { useState, useEffect } from 'react';

export default function EchoMusicReal() {
  const [section, setSection] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [songs, setSongs] = useState([]);

  // บังคับโหลด Tailwind CSS ผ่าน CDN เพื่อแก้ Error ของ Vercel
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.head.appendChild(script);
    
    const configScript = document.createElement('script');
    configScript.innerHTML = `
      tailwind.config = {
        theme: {
          extend: {
            colors: { sage: '#A3B18A', sand: '#F4F1EA', charcoal: '#2D2D2D' }
          }
        }
      }
    `;
    document.head.appendChild(configScript);
  }, []);

  const handleLogin = (service) => {
    setIsLoggedIn(true);
    setActiveService(service);
    // ในระบบจริง ตรงนี้จะ Redirect ไปหน้า Google OAuth
    // ตอนนี้เราจะจำลองการดึงข้อมูลจาก API ที่เราสร้างไว้ใน /api/youtube/songs
    fetch('/api/youtube/songs')
      .then(res => res.json())
      .then(data => {
        if(data.songs) setSongs(data.songs);
        else setSongs([
          { title: "Real Data Coming Soon", artist: "YouTube API", genre: "Syncing", mood: "Loading" }
        ]);
      })
      .catch(() => {
        setSongs([{ title: "Sync Error", artist: "Check API Key", genre: "Error", mood: "Sad" }]);
      });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl border border-slate-100 text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#A3B18A] rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">E</div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to EchoMusic</h1>
          <p className="text-slate-500">เชื่อมต่อคลังเพลงของคุณเพื่อเริ่มวิเคราะห์ Sonic DNA</p>
          <div className="flex flex-col gap-4">
            {['Spotify', 'YouTube Music', 'Apple Music'].map(s => (
              <button key={s} onClick={() => handleLogin(s)} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-[#A3B18A] hover:bg-[#A3B18A]/5 transition-all group">
                <span className="font-medium text-slate-700 group-hover:text-[#A3B18A]">{s}</span>
                <span className="text-slate-300 group-hover:text-[#A3B18A]">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFB] text-slate-800 font-sans">
      <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#A3B18A] rounded-full"></div>
          <h1 className="text-lg font-semibold text-slate-800">EchoMusic</h1>
        </div>
        <nav className="flex flex-col gap-3">
          <button onClick={() => setSection('dashboard')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'dashboard' ? 'bg-[#A3B18A] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span>📊 Analysis</span>
          </button>
          <button onClick={() => setSection('shuffle')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'shuffle' ? 'bg-[#A3B18A] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <span>🎲 Smart Shuffle</span>
          </button>
        </nav>
        <div className="mt-auto p-5 rounded-3xl bg-[#F4F1EA] border border-[#E5DED0]">
          <p className="text-slate-500 text-xs mb-2">Active Account</p>
          <div className="flex items-center gap-2 text-[#588157] font-semibold">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            {activeService}
          </div>
        </div>
      </aside>
      <main className="flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{section === 'dashboard' ? 'Sonic DNA' : 'Smart Shuffle'}</h2>
            <p className="text-slate-400 mt-2">Analyzing your {activeService} identity.</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-xs hover:bg-slate-50">Logout</button>
        </header>
        {section === 'dashboard' ? (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#A3B18A] transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Listening Time</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-800">1,420 <span className="text-lg font-normal text-slate-400">hrs</span></h3>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#A3B18A] transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Top Mood</p>
                <h3 className="text-3xl font-bold mt-2 text-[#A3B18A]">Nostalgic</h3>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-[#A3B18A] transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Discovery Rate</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-800">High</h3>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-slate-200">
              <h4 className="text-xl font-semibold mb-6 text-slate-800">Your Real Tracks (from YouTube)</h4>
              <div className="space-y-4">
                {songs.map((s, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center group hover:border-[#A3B18A] transition-all">
                    <div>
                      <p className="font-semibold text-slate-800">{s.title}</p>
                      <p className="text-xs text-slate-400">{s.artist} • {s.mood}</p>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-[#A3B18A] group-hover:text-white transition-all">▶</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-xl mx-auto text-center space-y-10">
            <div className="p-12 rounded-3xl bg-white border border-slate-200 space-y-8">
              <h3 className="text-2xl font-bold text-slate-800">Smart Shuffle</h3>
              <button className="px-10 py-3 rounded-full bg-[#A3B18A] text-white font-medium hover:bg-opacity-90 transition-all active:scale-95">Shuffle Track</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
