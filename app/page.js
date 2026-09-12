"use client"
import React, { useState } from 'react';
import { BarChart3, Shuffle, Trash2, Play, Music, LayoutDashboard, LogIn, Globe, Heart } from 'lucide-react';

export default function EchoMusicV2() {
  const [section, setSection] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeService, setActiveService] = useState(null);

  const services = [
    { id: 'spotify', name: 'Spotify', color: 'bg-green-500', icon: '🟢' },
    { id: 'youtube', name: 'YouTube Music', color: 'bg-red-600', icon: '🔴' },
    { id: 'apple', name: 'Apple Music', color: 'bg-pink-500', icon: '🌸' },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FBFBFB] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-xl border border-slate-100 text-center space-y-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-sage rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-sage/30">E</div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to EchoMusic</h1>
          <p className="text-slate-500">เชื่อมต่อคลังเพลงของคุณเพื่อเริ่มวิเคราะห์ Sonic DNA</p>
          
          <div className="flex flex-col gap-4">
            {services.map(s => (
              <button 
                key={s.id} 
                onClick={() => { setIsLoggedIn(true); setActiveService(s.name); }}
                className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-sage hover:bg-sage/5 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{s.icon}</span>
                  <span className="font-medium text-slate-700 group-hover:text-sage transition-all">{s.name}</span>
                </div>
                <LogIn size={18} className="text-slate-300 group-hover:text-sage transition-all" />
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-400 italic">ข้อมูลของคุณจะถูกประมวลผลอย่างปลอดภัย</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFB] text-slate-800">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 p-8 flex flex-col gap-10">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#A3B18A] rounded-full"></div>
          <h1 className="text-lg font-semibold text-slate-800">EchoMusic</h1>
        </div>

        <nav className="flex flex-col gap-3">
          <button onClick={() => setSection('dashboard')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'dashboard' ? 'bg-[#A3B18A] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <LayoutDashboard size={18} /> Analysis
          </button>
          <button onClick={() => setSection('shuffle')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'shuffle' ? 'bg-[#A3B18A] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Shuffle size={18} /> Smart Shuffle
          </button>
          <button onClick={() => setSection('cleanup')} className={`flex items-center gap-3 p-3 rounded-xl transition-all font-medium ${section === 'cleanup' ? 'bg-[#A3B18A] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Trash2 size={18} /> Library
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

      {/* Main Content */}
      <main className="flex-1 p-12">
        <header className="flex justify-between items-end mb-12">
          <div className="animate-in fade-in slide-in-from-top-4 duration-700">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              {section === 'dashboard' ? 'Sonic DNA' : section === 'shuffle' ? 'Smart Shuffle' : 'Library Curator'}
            </h2>
            <p className="text-slate-400 mt-2">Analyzing your {activeService} identity.</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-500 text-xs hover:bg-slate-50 transition-all">Logout</button>
        </header>

        {section === 'dashboard' && (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Listening Time</p>
                <h3 className="text-3xl font-bold mt-2 text-slate-800">1,420 <span className="text-lg font-normal text-slate-400">hrs</span></h3>
              </div>
              <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-sage transition-all">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold">Top Mood</p>
                <h3 className="text-3xl font-bold mt-2 text-[#A3B18A]">Nostalgic</h3>
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
                  {[ {n: 'City Pop', p: '45%', c: 'bg-[#A3B18A]'}, {n: 'Lo-fi', p: '30%', c: 'bg-[#BDB76B]'}, {n: 'K-Pop', p: '15%', c: 'bg-slate-300'} ].map(g => (
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
                <h4 className="text-xl font-semibold mb-6 text-slate-800 flex items-center gap-2">
                  <Heart size={20} className="text-pink-400" /> Mood-Based Recs
                </h4>
                <div className="space-y-4">
                  {[ {t: "Plastic Love", a: "Mariya Takeuchi", m: "Nostalgic"}, {t: "Hype Boy", a: "NewJeans", m: "Energetic"} ].map((s, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center group hover:border-sage transition-all">
                      <div>
                        <p className="font-semibold text-slate-800">{s.t}</p>
                        <p className="text-xs text-slate-400">{s.a} • {s.m}</p>
                      </div>
                      <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-sage group-hover:text-white transition-all">
                        <Play size={12} fill="currentColor" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {section === 'shuffle' && (
          <div className="max-w-xl mx-auto text-center space-y-10 animate-in fade-in duration-700">
            <div className="p-12 rounded-3xl bg-white border border-slate-200 space-y-8">
              <h3 className="text-2xl font-bold text-slate-800">Smart Shuffle</h3>
              <div className="flex flex-col gap-6 items-center">
                <select className="w-full max-w-xs p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:ring-2 ring-sage transition-all cursor-pointer text-center">
                  <option>All Genres</option>
                  <option>City Pop</option>
                  <option>Lo-fi</option>
                  <option>K-Pop</option>
                </select>
                <button className="px-10 py-3 rounded-full bg-sage text-white font-medium hover:bg-opacity-90 transition-all active:scale-95">
                  Shuffle Track
                </button>
              </div>
            </div>
          </div>
        )}

        {section === 'cleanup' && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 animate-in fade-in duration-700">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-slate-800">Library Curator</h3>
              <span className="px-4 py-1 rounded-full bg-slate-100 text-slate-500 text-xs border border-slate-200">12 forgotten tracks</span>
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
                {[ {t: "Plastic Love", a: "Mariya Takeuchi"}, {t: "Stay with Me", a: "Miki Matsubara"} ].map((s, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-all">
                    <td className="py-4 font-medium text-slate-700">{s.t}</td>
                    <td className="py-4 text-slate-500">{s.a}</td>
                    <td className="py-4 text-right">
                      <button onClick={(e) => e.target.closest('tr').remove()} className="text-slate-300 hover:text-red-400 transition-all text-xs">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
