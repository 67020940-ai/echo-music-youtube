"use client"
import React, { useState, useEffect } from 'react';
import { BarChart3, Shuffle, Trash2, Play, Music, LayoutDashboard } from 'lucide-react';

export default function EchoMusic() {
  const [section, setSection] = useState('dashboard');
  const [apiKey, setApiKey] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [songs, setSongs] = useState([]);

  // จำลองการดึงข้อมูลจาก YouTube API
  const syncYouTubeData = async () => {
    if (!apiKey) return alert("กรุณาใส่ API Key ก่อนครับ");
    setIsSynced(true);
    // จำลองการ Fetch ข้อมูลจาก YouTube API
    setTimeout(() => {
      setSongs([
        { title: "Plastic Love", artist: "Mariya Takeuchi", genre: "City Pop", mood: "Nostalgic" },
        { title: "Hype Boy", artist: "NewJeans", genre: "K-Pop", mood: "Energetic" },
        { title: "Lofi Study", artist: "Lofi Girl", genre: "Lo-fi", mood: "Chill" },
        { title: "Blue Train", artist: "John Coltrane", genre: "Jazz", mood: "Sophisticated" },
      ]);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-sage rounded-full"></div>
          <h1 className="text-lg font-semibold text-slate-800">EchoMusic</h1>
        </div>

        <nav className="flex flex-col gap-3">
          <button onClick={() => setSection('dashboard')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'dashboard' ? 'bg-sage text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LayoutDashboard size={18} /> Analysis
          </button>
          <button onClick={() => setSection('shuffle')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'shuffle' ? 'bg-sage text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Shuffle size={18} /> Smart Shuffle
          </button>
          <button onClick={() => setSection('cleanup')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'cleanup' ? 'bg-sage text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Trash2 size={18} /> Library
          </button>
        </nav>

        <div className="mt-auto p-5 rounded-2xl bg-sand border border-[#E5DED0]">
          <p className="text-slate-500 text-xs mb-2">YouTube Sync</p>
          <input 
            type="password" 
            placeholder="Enter API Key..." 
            className="w-full p-2 text-xs rounded-lg border border-slate-200 mb-2 outline-none focus:ring-1 ring-sage"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <button 
            onClick={syncYouTubeData}
            className="w-full py-2 bg-sage text-white text-xs rounded-lg font-bold hover:bg-opacity-90 transition-all"
          >
            {isSynced ? 'Syncing...' : 'Connect YouTube'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              {section === 'dashboard' ? 'Sonic DNA' : section === 'shuffle' ? 'Smart Shuffle' : 'Library Curator'}
            </h2>
            <p className="text-slate-400 mt-2">Analyzing your YouTube music identity.</p>
          </div>
        </header>

        {section === 'dashboard' && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Listening Time</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-800">1,420 <span className="text-lg font-normal text-slate-400">hrs</span></h3>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Top Mood</p>
                <h3 className="text-3xl font-bold mt-2 text-sage">Nostalgic</h3>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Discovery Rate</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-800">High</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <h4 className="text-xl font-semibold mb-8 text-slate-800 flex items-center gap-2">
                  <BarChart3 size={20} className="text-sage" /> Genre DNA
                </h4>
                <div className="space-y-6">
                  {[ {n: 'City Pop', p: '45%', c: 'bg-sage'}, {n: 'Lo-fi', p: '30%', c: 'bg-sand'}, {n: 'K-Pop', p: '15%', c: 'bg-slate-300'} ].map(g => (
                    <div key={g.n}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-600 font-medium">{g.n}</span>
                        <span className="text-slate-400">{g.p}</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div className={`${g.c} h-full transition-all duration-1000`} style={{ width: g.p }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200">
                <h4 className="text-xl font-semibold mb-6 text-slate-800">Mood-Based Recs</h4>
                <div className="space-y-4">
                  {songs.length > 0 ? songs.map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center group hover:border-sage transition-all">
                      <div>
                        <p className="font-semibold text-slate-800">{s.title}</p>
                        <p className="text-xs text-slate-400">{s.artist} • {s.mood}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-all">
                        <Play size={12} fill="currentColor" />
                      </button>
                    </div>
                  )) : <p className="text-slate-400 text-sm text-center py-10">Connect YouTube to see recommendations</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {section === 'shuffle' && (
          <div className="max-w-xl mx-auto text-center space-y-10">
            <div className="p-12 rounded-3xl bg-white border border-slate-200 space-y-8">
              <h3 className="text-2xl font-bold text-slate-800">Smart Shuffle</h3>
              <div className="flex flex-col gap-6 items-center">
                <select className="w-full max-w-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:ring-2 ring-sage transition-all cursor-pointer appearance-none text-center">
                  <option>All Genres</option>
                  <option>City Pop</option>
                  <option>Lo-fi</option>
                  <option>K-Pop</option>
                </select>
                <button onClick={() => alert('Shuffling your YouTube Library...')} className="px-10 py-3 rounded-full bg-sage text-white font-medium hover:bg-opacity-90 transition-all active:scale-95">
                  Shuffle Track
                </button>
              </div>
            </div>
          </div>
        )}

        {section === 'cleanup' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800">Library Curator</h3>
              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-500 text-xs border border-slate-200">Forgotten Tracks</span>
            </div>
            <table className="w-full text-left">
              <thead className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-100">
                <tr>
                  <th className="pb-4 font-medium">Song</th>
                  <th className="pb-4 font-medium">Artist</th>
                  <th className="pb-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {songs.length > 0 ? songs.map((s, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-all">
                    <td className="py-4 font-medium text-slate-700">{s.title}</td>
                    <td className="py-4 text-slate-500">{s.artist}</td>
                    <td className="py-4 text-right">
                      <button onClick={(e) => e.target.closest('tr').remove()} className="text-slate-300 hover:text-red-400 transition-all text-xs">Remove</button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="3" className="py-10 text-center text-slate-400">Connect YouTube to curate your library</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
