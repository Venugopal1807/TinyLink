import { PrismaClient } from '@prisma/client';
import { ArrowLeft, BarChart2, Calendar, Globe, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Initialize Prisma
const prisma = new PrismaClient();

// Force dynamic rendering so stats are always fresh
export const dynamic = 'force-dynamic';

// Updated interface to handle both Next.js 14 (Object) and 15 (Promise)
export default async function StatsPage({ params }: { params: any }) {
  // Await params to ensure compatibility with Next.js 15
  const resolvedParams = await params;
  const code = resolvedParams.code;

  if (!code) return notFound();

  // Fetch data directly from DB
  const link = await prisma.link.findUnique({
    where: { shortCode: code }
  });

  if (!link) {
    return notFound();
  }

  // Format Dates
  const createdDate = new Date(link.createdAt).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  
  const lastClicked = link.lastClickedAt 
    ? new Date(link.lastClickedAt).toLocaleString('en-US')
    : 'Never';

  // Safe URL generation for QR code
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const qrData = `${baseUrl}/${link.shortCode}`;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans p-6">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors text-sm font-medium group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Dashboard
        </Link>

        {/* Header Card */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 mb-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-24 bg-indigo-500/10 rounded-full blur-3xl -mr-12 -mt-12 pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 text-xs rounded-full font-medium flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                Active
              </span>
              <span className="text-zinc-500 text-xs font-mono uppercase tracking-wider">ID: {link.id}</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">/{link.shortCode}</h1>
            <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono break-all">
              <Globe className="w-4 h-4 shrink-0" />
              {link.originalUrl}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Total Clicks */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 text-zinc-400 mb-2">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <BarChart2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">Total Clicks</span>
            </div>
            <div className="text-3xl font-bold text-white">{link.clicks.toLocaleString()}</div>
          </div>

          {/* Last Clicked */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 text-zinc-400 mb-2">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">Last Clicked</span>
            </div>
            <div className="text-lg font-medium text-white">{lastClicked}</div>
          </div>

          {/* Created Date */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-xl">
            <div className="flex items-center gap-3 text-zinc-400 mb-2">
              <div className="p-2 bg-zinc-800 rounded-lg text-zinc-300">
                <Calendar className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider">Created</span>
            </div>
            <div className="text-lg font-medium text-white">{createdDate}</div>
          </div>
        </div>
        
        {/* QR Code Section */}
        <div className="mt-6 bg-white text-black p-6 rounded-xl flex items-center justify-between shadow-xl">
          <div>
            <h3 className="font-bold text-lg">Mobile QR Code</h3>
            <p className="text-zinc-500 text-sm max-w-xs mt-1">Scan this code to visit the link instantly on any device.</p>
          </div>
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`} 
            alt="QR Code" 
            className="w-24 h-24 mix-blend-multiply"
          />
        </div>

      </div>
    </div>
  );
}