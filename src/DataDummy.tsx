import { useEffect, useState, useCallback } from "react";
import axios from "axios";

type Theme = "light" | "dark";

// Tambahan mode untuk Filter Author
enum ApiMode {
  DEFAULT = "default",
  SORT_AUTHOR_ASC = "sort-author-asc",
  SORT_QUOTE_DESC = "sort-quote-desc",
  FILTER_AUTHOR_RUMI = "filter-author-rumi"
}

interface Quote {
  id: number;
  quote: string;
  author: string;
}

export default function DataDummy() {
  const [theme, setTheme] = useState<Theme>("light");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [totalData, setTotalData] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [apiMode, setApiMode] = useState<ApiMode>(ApiMode.SORT_QUOTE_DESC);

  const fetchQuotes = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      let url = "http://localhost:3000/quotes";
      
      switch (apiMode) {
        case ApiMode.SORT_AUTHOR_ASC:
          url += "?_sort=author"; 
          break;
        case ApiMode.SORT_QUOTE_DESC:
          url += "?_sort=-quote"; 
          break;
        case ApiMode.FILTER_AUTHOR_RUMI:
          url += "?author=Rumi"; 
          break;
        default:
          break;
      }

      const response = await axios.get<Quote[]>(url);
      setQuotes(response.data);
      setTotalData(response.data.length); 
      
    } catch (err) {
      setError("Gagal konek ke database lokal. Pastikan 'json-server --watch db.json' menyala di port 3000.");
    } finally {
      setLoading(false);
    }
  }, [apiMode]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setApiMode(e.target.value as ApiMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 font-sans selection:bg-orange-500 selection:text-white ${
      theme === "light" 
        ? "bg-[#f8f7f4] text-[#1c1c1e]" 
        : "bg-[#09090b] text-[#ededed]"
    }`}>
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-500/10 via-transparent to-transparent pointer-events-none blur-3xl"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-opacity-80 flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 py-5 gap-4 border-b border-current/10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.6)] animate-pulse"></div>
          <span className="font-serif tracking-[0.25em] font-bold text-xs uppercase opacity-90">The Quiet Space</span>
        </div>
        
        <div className="flex items-center gap-5">
          {/* DROPDOWN MODE */}
          <div className={`relative flex items-center px-3 py-1.5 rounded-full border transition-all ${
            theme === "light" ? "bg-black/5 border-black/10" : "bg-white/5 border-white/10"
          }`}>
            <span className="text-[9px] font-bold uppercase tracking-wider opacity-40 mr-2">Mode:</span>
            <select
              value={apiMode}
              onChange={handleModeChange}
              className="bg-transparent text-[10px] sm:text-xs font-bold tracking-wider uppercase focus:outline-none cursor-pointer appearance-none pr-4"
            >
              <option value={ApiMode.SORT_QUOTE_DESC} className="bg-white text-black">Urut Quote (Z-A)</option>
              <option value={ApiMode.SORT_AUTHOR_ASC} className="bg-white text-black">Urut Author (A-Z)</option>
              <option value={ApiMode.FILTER_AUTHOR_RUMI} className="bg-white text-black">Filter Author (Rumi)</option>
              <option value={ApiMode.DEFAULT} className="bg-white text-black">Default (ID)</option>
            </select>
          </div>

          <button 
            onClick={() => setTheme(theme === "light" ? "dark" : "light")} 
            className={`p-2 rounded-full border transition-all duration-300 ${
              theme === "light" 
                ? "border-black/10 hover:bg-black hover:text-white" 
                : "border-white/10 hover:bg-white hover:text-black"
            }`}
          >
            {theme === "light" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow flex flex-col px-6 sm:px-12 py-12 max-w-6xl mx-auto w-full z-10">
        
        <div className="mb-14 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-current/10 pb-8">
          <div>
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight mb-3">Inspirations.</h1>
            <p className="text-xs sm:text-sm tracking-widest uppercase opacity-50 font-medium">
              {apiMode === ApiMode.SORT_QUOTE_DESC ? "Sorted by quote (Z - A)" : 
               apiMode === ApiMode.SORT_AUTHOR_ASC ? "Sorted by author (A - Z)" : 
               apiMode === ApiMode.FILTER_AUTHOR_RUMI ? "Filtered by author (Rumi)" :
               "Default Local Database"}
            </p>
          </div>
          
          {/* TOTAL DATA */}
          <div className={`px-4 py-2 rounded-xl border text-[10px] sm:text-xs font-bold tracking-widest uppercase shadow-sm ${
            theme === "light" ? "bg-white border-black/10" : "bg-neutral-900 border-white/10"
          }`}>
            Total <span className="text-orange-500 font-extrabold">{totalData}</span> Data
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-serif italic text-lg opacity-50">Menyusun koleksi kata...</p>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-serif text-center my-10">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {quotes.map((item, index) => (
              <div 
                key={item.id}
                className={`group relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-xl ${
                  theme === "light" 
                    ? "bg-white border-black/5 hover:border-orange-500/30" 
                    : "bg-neutral-900/60 border-white/5 hover:border-orange-500/40 backdrop-blur-sm"
                }`}
              >
                <span className="absolute top-4 right-6 font-serif text-6xl opacity-5 select-none group-hover:opacity-10 transition-opacity">
                  “
                </span>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono tracking-widest opacity-30">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-md tracking-wider">
                    ID #{item.id}
                  </span>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-lg sm:text-xl font-serif leading-relaxed group-hover:text-orange-500 transition-colors">
                    "{item.quote}"
                  </h2>
                </div>
                
                <div className="flex items-center gap-3 pt-4 border-t border-current/5">
                  <div className="w-6 h-[1px] bg-orange-500/50"></div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] opacity-70">
                    {item.author || "Anonim"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button
            onClick={fetchQuotes}
            disabled={loading}
            className={`px-10 py-4 rounded-xl text-xs font-bold tracking-[0.25em] uppercase transition-all duration-300 shadow-md active:scale-95 ${
              theme === "light" 
                ? "bg-[#1c1c1e] text-white hover:bg-orange-600 shadow-black/10" 
                : "bg-white text-black hover:bg-orange-500 hover:text-white shadow-white/5"
            }`}
          >
            {loading ? "Memuat..." : "Muat Ulang Data"}
          </button>
        </div>

      </main>

      <footer className="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 py-8 gap-4 border-t border-current/10 opacity-70">
        <div className="text-[10px] font-bold tracking-widest uppercase">
          Local JSON Server &copy; 2026
        </div>
        <div className="text-[10px] font-serif italic">
          Breathe. Reflect. Grow.
        </div>
      </footer>

    </div>
  );
}