'use client';

import { useState, useEffect } from 'react';
import { Link2, Globe, Hash, Copy, ExternalLink, Trash2, BarChart2, Loader2, AlertCircle, Ghost } from 'lucide-react';
import Link from 'next/link';

type LinkData = {
  id: number;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
};

export default function Dashboard() {
  const [links, setLinks] = useState<LinkData[]>([]);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Fetch Links
  useEffect(() => {
    fetch('/api/links')
      .then(res => res.json())
      .then(data => setLinks(Array.isArray(data) ? data : []));
  }, []);

  // 2. Create Link
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, shortCode: code || undefined }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setLinks([data, ...links]);
      setUrl('');
      setCode('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Delete Link (Fixed: Now outside handleSubmit)
  const handleDelete = async (shortCode: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    // Optimistic Update
    const previousLinks = [...links];
    setLinks(links.filter(l => l.shortCode !== shortCode));

    try {
      const res = await fetch(`/api/links/${shortCode}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
    } catch (err) {
      alert('Failed to delete link from server.');
      setLinks(previousLinks);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${window.location.host}/${text}`);
    alert('Copied!');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <header className="flex items-center gap-3 mb-12">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/20">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">TinyLink <span className="text-indigo-500">Enterprise</span></h1>
        </header>

        <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm mb-10">
          <h2 className="text-lg font-semibold mb-1">Shorten a new link</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-grow relative group">
              <Globe className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition" />
              <input type="url" required placeholder="https://example.com" className="w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition" value={url} onChange={e => setUrl(e.target.value)} />
            </div>
            <div className="w-full md:w-48 relative group">
              <Hash className="absolute left-3 top-3.5 w-5 h-5 text-zinc-500 group-focus-within:text-indigo-400 transition" />
              <input type="text" placeholder="alias" maxLength={8} className="w-full pl-10 pr-4 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition font-mono text-sm" value={code} onChange={e => setCode(e.target.value)} />
            </div>
            <button type="submit" disabled={loading} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg transition disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Shorten'}
            </button>
          </form>
          {error && <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-center gap-2"><AlertCircle className="w-4 h-4" /> {error}</div>}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider px-1">Active Links</h3>
          {links.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-2xl">
              <Ghost className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
              <p className="text-zinc-500">No links yet. Create one above!</p>
            </div>
          ) : (
            links.map(link => (
              <div key={link.id} className="bg-zinc-900/30 hover:bg-zinc-900/80 border border-zinc-800/50 p-4 rounded-xl flex items-center justify-between gap-4 group">
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-indigo-400 font-mono font-bold">/{link.shortCode}</span>
                    <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-0.5 rounded-full border border-zinc-700">{link.clicks} clicks</span>
                  </div>
                  <div className="text-zinc-500 text-sm truncate max-w-md">{link.originalUrl}</div>
                </div>
                
                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => copyToClipboard(link.shortCode)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition" title="Copy">
                    <Copy className="w-4 h-4" />
                  </button>
                  <a href={`/${link.shortCode}`} target="_blank" className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-green-400 transition" title="Test">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <Link href={`/code/${link.shortCode}`} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-indigo-400 transition" title="Stats">
                    <BarChart2 className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleDelete(link.shortCode)} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-red-400 transition" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}