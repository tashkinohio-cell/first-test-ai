/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Plus, 
  ChevronUp, 
  ChevronDown, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Film, 
  Tv, 
  Search, 
  X, 
  AlertTriangle, 
  Skull, 
  Flame, 
  CheckSquare, 
  Square,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AnimeItem, SeasonItem, EpisodeItem } from "./types";

// High-fidelity pre-loaded debug list to showcase the AI's power & multi-season layout
const DEMO_ANIME: AnimeItem[] = [
  {
    id: "demo-cote",
    title: "Classroom of the Elite",
    originalQuery: "Classroom of the Elite",
    expandedTitle: "Classroom of the Elite (Youkoso Jitsuryoku Shijou Shugi no Kyoushitsu e)",
    synopsis: "In a prestigious high school where merit dictates classes and statuses, school-merit rules dictate social hierarchy. The mysterious mastermind Kiyotaka Ayanokouji maneuvers deep psychological game-theory contests to help his underprivileged Class D climb to the top.",
    genres: ["Psychological", "Drama", "Suspense", "School"],
    studio: "Lerche",
    rating: "8.4/10",
    rank: 0,
    isFixed: true,
    createdAt: new Date().toISOString(),
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "What is Evil? Whatever Springs from Weakness.", completed: true },
          { episodeNumber: 2, title: "It Takes a Great Talent to Conceal One's Talent.", completed: true },
          { episodeNumber: 3, title: "Man is an Animal that Makes Bargains.", completed: true },
          { episodeNumber: 4, title: "We Should Not Be Upset that Others Hide the Truth.", completed: true },
          { episodeNumber: 5, title: "Hell is Other People.", completed: true },
          { episodeNumber: 6, title: "There Are Two Kinds of Lies.", completed: true },
          { episodeNumber: 7, title: "Nothing is Deeper than Ignorance.", completed: true },
          { episodeNumber: 8, title: "To Cerberus, One Must Throw a Honey Cake.", completed: true },
          { episodeNumber: 9, title: "Man is Condemned to Be Free.", completed: true },
          { episodeNumber: 10, title: "The Worst Enemy You Can Meet Will Always Be Yourself.", completed: true },
          { episodeNumber: 11, title: "What People Commonly Call Fate.", completed: true },
          { episodeNumber: 12, title: "Genius Lives Only One Story Above Madness.", completed: true }
        ]
      },
      {
        seasonNumber: 2,
        episodes: [
          { episodeNumber: 1, title: "Remember to Keep a Clear Mind in Difficulties.", completed: true },
          { episodeNumber: 2, title: "There Are Two Cardinal Sins from Which All Others Spring.", completed: true },
          { episodeNumber: 3, title: "The Greatest Souls Are Capable of the Greatest Vices.", completed: true },
          { episodeNumber: 4, title: "The Material has to be Created.", completed: true },
          { episodeNumber: 5, title: "Every Failure is a Step to Success.", completed: true },
          { episodeNumber: 6, title: "Adversity is the First Path to Truth.", completed: false },
          { episodeNumber: 7, title: "To Doubt Everything or to Believe Everything.", completed: false },
          { episodeNumber: 8, title: "The Wound is at the Heart.", completed: false },
          { episodeNumber: 9, title: "If You Make a Mistake and Do Not Correct It.", completed: false },
          { episodeNumber: 10, title: "People, Often Grudging, Are Swift to Praise.", completed: false },
          { episodeNumber: 11, title: "A Person Who is Not Master of Himself.", completed: false },
          { episodeNumber: 12, title: "Force, Without Wisdom, Falls by Its Own Weight.", completed: false },
          { episodeNumber: 13, title: "There is No Remedy for Love but to Love More.", completed: false }
        ]
      },
      {
        seasonNumber: 3,
        episodes: [
          { episodeNumber: 1, title: "The Strongest Principle of Growth lies in Human Choice.", completed: false },
          { episodeNumber: 2, title: "Man is Prepared to Cheat When Necessary.", completed: false },
          { episodeNumber: 3, title: "We Must Not Forgive Ourselves.", completed: false },
          { episodeNumber: 4, title: "To Rest is to Prepare for the Next Walk.", completed: false },
          { episodeNumber: 5, title: "Do Not Despise a Short Journey.", completed: false },
          { episodeNumber: 6, title: "Destiny Grins at Our Plight.", completed: false },
          { episodeNumber: 7, title: "People Do Not Like Being Judged.", completed: false },
          { episodeNumber: 8, title: "Those Who Trust Are Easily Fooled.", completed: false },
          { episodeNumber: 9, title: "He Who Conquers Himself is the Mightiest Warrior.", completed: false },
          { episodeNumber: 10, title: "Rules Were Made to Be Broken.", completed: false },
          { episodeNumber: 11, title: "A True Friend Hears the Silent Whispers.", completed: false },
          { episodeNumber: 12, title: "Change is the Sole Eternal Law.", completed: false },
          { episodeNumber: 13, title: "The End Justifies the Means.", completed: false }
        ]
      },
      {
        seasonNumber: 4,
        episodes: [
          { episodeNumber: 1, title: "The White Room Reunion (First-year arc climax)", completed: false },
          { episodeNumber: 2, title: "Maneuver and Defect", completed: false },
          { episodeNumber: 3, title: "First Incursions of Year 2", completed: false },
          { episodeNumber: 4, title: "Stalemates and Sacred Vows in Year 2", completed: false },
          { episodeNumber: 5, title: "A Cold War in Quiet Corridors", completed: false },
          { episodeNumber: 6, title: "Double Agents Rise", completed: false },
          { episodeNumber: 7, title: "Underestimation is the Deadliest Weapon", completed: false },
          { episodeNumber: 8, title: "Behind Closed Doors of school board", completed: false },
          { episodeNumber: 9, title: "Mind over Merit exam", completed: false },
          { episodeNumber: 10, title: "Flawless Deception", completed: false },
          { episodeNumber: 11, title: "Checkmate Imminent with Class A", completed: false },
          { episodeNumber: 12, title: "A Light in the Grey Classroom", completed: false }
        ]
      }
    ],
    status: "Watching"
  },
  {
    id: "demo-jjk",
    title: "Jujutsu Kaisen",
    originalQuery: "Jujutsu Kaisen",
    expandedTitle: "Jujutsu Kaisen (Sorcery Fight)",
    synopsis: "A boy swallows a cursed talisman—the finger of a demon—and becomes cursed himself. He enters a shaman's school to find all other talismans and save his spirit before execution.",
    genres: ["Action", "Dark Fantasy", "Supernatural", "Shounen"],
    studio: "MAPPA",
    rating: "8.9/10",
    rank: 1,
    isFixed: true,
    createdAt: new Date().toISOString(),
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          { episodeNumber: 1, title: "Ryomen Sukuna", completed: true },
          { episodeNumber: 2, title: "For Myself", completed: true },
          { episodeNumber: 3, title: "Girl of Steel", completed: true },
          { episodeNumber: 4, title: "Curse Womb Must Die", completed: true },
          { episodeNumber: 5, title: "Curse Womb Must Die -II-", completed: true },
          { episodeNumber: 6, title: "After Rain", completed: false },
          { episodeNumber: 7, title: "Assault", completed: false },
          { episodeNumber: 8, title: "Boredom", completed: false }
        ]
      },
      {
        seasonNumber: 2,
        episodes: [
          { episodeNumber: 1, title: "Hidden Inventory", completed: false },
          { episodeNumber: 2, title: "Hidden Inventory 2", completed: false },
          { episodeNumber: 3, title: "Hidden Inventory 3", completed: false },
          { episodeNumber: 4, title: "Hidden Inventory 4", completed: false },
          { episodeNumber: 5, title: "Premature Death", completed: false },
          { episodeNumber: 6, title: "It's Like That", completed: false },
          { episodeNumber: 7, title: "Shibuya Incident", completed: false },
          { episodeNumber: 8, title: "Shibuya Incident - Open Gate", completed: false }
        ]
      },
      {
        seasonNumber: 3,
        episodes: [
          { episodeNumber: 1, title: "The Culling Game Begins", completed: false },
          { episodeNumber: 2, title: "Tokyo No. 1 Colony - Arrival", completed: false },
          { episodeNumber: 3, title: "Fushiguro's Gambit", completed: false },
          { episodeNumber: 4, title: "The Executioner's Sword", completed: false },
          { episodeNumber: 5, title: "Showdown in Sendai", completed: false },
          { episodeNumber: 6, title: "Unleashed Void", completed: false },
          { episodeNumber: 7, title: "Shinjuku Showdown Preparations", completed: false },
          { episodeNumber: 8, title: "Unlimited Void vs Malevolent Shrine", completed: false }
        ]
      }
    ],
    status: "Plan to Watch"
  }
];

export default function App() {
  const [animeList, setAnimeList] = useState<AnimeItem[]>(() => {
    const raw = localStorage.getItem("otaku_anime_list");
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error("Failed parsing stored anime list, falling back to demos", e);
      }
    }
    return DEMO_ANIME;
  });

  const [newAnimeInput, setNewAnimeInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterGenre, setFilterGenre] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(() => {
    // Select first item initially for preview
    const raw = localStorage.getItem("otaku_anime_list");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.length > 0) return parsed[0].id;
      } catch {}
    }
    return "demo-cote";
  });
  
  const [activeSeason, setActiveSeason] = useState<number>(1);
  const [watchlistTab, setWatchlistTab] = useState<'All' | 'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped'>('All');
  const [newAnimeStatus, setNewAnimeStatus] = useState<'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped'>('Plan to Watch');
  const [loadingMessage, setLoadingMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  // Extra interactions states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [safeDeleteLock, setSafeDeleteLock] = useState<Record<string, boolean>>({});
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("otaku_anime_list", JSON.stringify(animeList));
  }, [animeList]);

  // Maintain activeSeason bounds on changing selected anime
  useEffect(() => {
    if (selectedId) {
      const anime = animeList.find(x => x.id === selectedId);
      if (anime) {
        // Ensure active season is valid
        const hasSeason = anime.seasons.some(s => s.seasonNumber === activeSeason);
        if (!hasSeason && anime.seasons.length > 0) {
          setActiveSeason(anime.seasons[0].seasonNumber);
        }
      }
    }
  }, [selectedId, animeList]);

  // Extract all unique genres for filter bar
  const allGenres = Array.from(
    new Set(animeList.flatMap((item) => item.genres || []))
  );

  // Filter & Search List
  const filteredAnimeList = animeList
    .filter((anime) => {
      const matchesSearch = 
        anime.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        anime.expandedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (anime.studio && anime.studio.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesGenre = filterGenre === "all" || anime.genres.includes(filterGenre);
      
      const matchesTab = 
        watchlistTab === "All" || 
        (anime.status || "Plan to Watch") === watchlistTab;
      
      return matchesSearch && matchesGenre && matchesTab;
    })
    .sort((a, b) => a.rank - b.rank);

  // Safe manual order management (prevent swaps that cause blank slots)
  const reorderRanks = (list: AnimeItem[]) => {
    return list.map((item, index) => ({ ...item, rank: index }));
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const sorted = [...animeList].sort((a, b) => a.rank - b.rank);
    // Swap rank
    const temp = sorted[index].rank;
    sorted[index].rank = sorted[index - 1].rank;
    sorted[index - 1].rank = temp;
    
    setAnimeList(reorderRanks(sorted));
  };

  const moveDown = (index: number) => {
    if (index === animeList.length - 1) return;
    const sorted = [...animeList].sort((a, b) => a.rank - b.rank);
    // Swap rank
    const temp = sorted[index].rank;
    sorted[index].rank = sorted[index + 1].rank;
    sorted[index + 1].rank = temp;
    
    setAnimeList(reorderRanks(sorted));
  };

  // Safe delete flow to protect user against misclicks
  const handleDeleteTrigger = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle delete state
    if (deleteConfirmationId === id) {
      // Confirmed, delete
      const deletedIndex = animeList.findIndex(a => a.id === id);
      const remaining = animeList.filter(a => a.id !== id);
      const reordered = reorderRanks(remaining);
      setAnimeList(reordered);
      setDeleteConfirmationId(null);
      // fallback selection
      if (selectedId === id) {
        setSelectedId(reordered.length > 0 ? reordered[0].id : null);
      }
    } else {
      // First click: trigger confirmation
      setDeleteConfirmationId(id);
      // Auto cancel after 4 seconds if they don't click again
      setTimeout(() => {
        setDeleteConfirmationId(prev => prev === id ? null : prev);
      }, 4000);
    }
  };

  // Autocomplete/fix trigger
  const handleAddAnime = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnimeInput.trim()) return;

    const queryText = newAnimeInput.trim();
    setLoadingMessage(`Invoking AI engine to fix, analyze, and build episode checkpoints...`);
    setError(null);

    try {
      const res = await fetch("/api/anime/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Internal AI query endpoint rejected the request.");
      }

      const data = await res.json();

      const newAnime: AnimeItem = {
        id: crypto.randomUUID(),
        title: queryText,
        originalQuery: queryText,
        expandedTitle: data.expandedTitle || queryText,
        synopsis: data.synopsis || "Loaded automatically without AI synopsis summary.",
        genres: data.genres && data.genres.length > 0 ? data.genres : ["Anime"],
        studio: data.studio || "Unknown Studio",
        rating: data.rating || "N/A",
        rank: animeList.length,
        isFixed: true,
        createdAt: new Date().toISOString(),
        status: newAnimeStatus,
        seasons: (data.seasons || []).map((s: any) => ({
          seasonNumber: s.seasonNumber,
          episodes: (s.episodes || []).map((ep: any) => ({
            episodeNumber: ep.episodeNumber,
            title: ep.title || `Episode ${ep.episodeNumber}`,
            completed: false
          }))
        }))
      };

      const updated = [...animeList, newAnime];
      setAnimeList(reorderRanks(updated));
      setSelectedId(newAnime.id);
      setNewAnimeInput("");
    } catch (err: any) {
      console.warn("AI Expansion failed. Adding basic anime item template fallback...", err);
      setError(`AI auto-formatting failed: ${err.message}. Added temporary fallback skeleton below.`);
      
      // Fallback adding to keep layout fully functional
      const fallbackAnime: AnimeItem = {
        id: crypto.randomUUID(),
        title: queryText,
        originalQuery: queryText,
        expandedTitle: queryText,
        synopsis: "Offline fallback summary. You can re-heal files when online.",
        genres: ["Custom"],
        studio: "N/A",
        rating: "N/A",
        rank: animeList.length,
        isFixed: false,
        createdAt: new Date().toISOString(),
        status: newAnimeStatus,
        seasons: [
          {
            seasonNumber: 1,
            episodes: Array.from({ length: 12 }, (_, i) => ({
              episodeNumber: i + 1,
              title: `Anime Episode ${i + 1}`,
              completed: false,
            }))
          }
        ]
      };
      const updated = [...animeList, fallbackAnime];
      setAnimeList(reorderRanks(updated));
      setSelectedId(fallbackAnime.id);
      setNewAnimeInput("");
    } finally {
      setLoadingMessage("");
    }
  };

  // Re-run AI fix on a fallback/unfixed anime
  const handleHealWithAI = async (id: string) => {
    const anime = animeList.find(a => a.id === id);
    if (!anime) return;

    setLoadingMessage(`Healing "${anime.title}" with clean AI datasets...`);
    setError(null);

    try {
      const res = await fetch("/api/anime/expand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: anime.title }),
      });

      if (!res.ok) {
        throw new Error("Healing endpoint failed.");
      }

      const data = await res.json();

      setAnimeList(prev => prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            expandedTitle: data.expandedTitle || item.title,
            synopsis: data.synopsis || item.synopsis,
            genres: data.genres && data.genres.length > 0 ? data.genres : item.genres,
            studio: data.studio || item.studio,
            rating: data.rating || item.rating,
            isFixed: true,
            seasons: (data.seasons || []).map((s: any) => ({
              seasonNumber: s.seasonNumber,
              episodes: (s.episodes || []).map((ep: any) => ({
                episodeNumber: ep.episodeNumber,
                title: ep.title || `Episode ${ep.episodeNumber}`,
                completed: false
              }))
            }))
          };
        }
        return item;
      }));
    } catch (err: any) {
      setError(`Healer fail: ${err.message}`);
    } finally {
      setLoadingMessage("");
    }
  };

  // Episode toggle WATCHED status
  const handleToggleEpisode = (animeId: string, seasonNum: number, episodeNum: number) => {
    setAnimeList(prevList => prevList.map(anime => {
      if (anime.id === animeId) {
        return {
          ...anime,
          seasons: anime.seasons.map(s => {
            if (s.seasonNumber === seasonNum) {
              return {
                ...s,
                episodes: s.episodes.map(ep => {
                  if (ep.episodeNumber === episodeNum) {
                    return { ...ep, completed: !ep.completed };
                  }
                  return ep;
                })
              };
            }
            return s;
          })
        };
      }
      return anime;
    }));
  };

  // Double check quick stats
  const selectedAnime = animeList.find(x => x.id === selectedId);

  const getAnimeProgress = (anime: AnimeItem) => {
    let total = 0;
    let completed = 0;
    anime.seasons.forEach(s => {
      s.episodes.forEach(e => {
        total++;
        if (e.completed) completed++;
      });
    });
    return { total, completed, pct: total ? Math.round((completed / total) * 100) : 0 };
  };

  // Clipboard copy details helper
  const handleCopy = (anime: AnimeItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const progress = getAnimeProgress(anime);
    const summaryText = `🎬 Anime Watchlist Summary:
📌 Title: ${anime.expandedTitle || anime.title}
🏢 Studio: ${anime.studio || "Unknown"}
⭐ Rating: ${anime.rating || "N/A"}
Genres: ${anime.genres.join(", ")}
📊 Watching Progress: ${progress.completed}/${progress.total} episodes finished (${progress.pct}%)
📖 Synopsis: ${anime.synopsis}`;

    navigator.clipboard.writeText(summaryText)
      .then(() => {
        setCopiedId(anime.id);
        setTimeout(() => setCopiedId(null), 2000);
      })
      .catch((err) => {
        console.error("Clipboard write error:", err);
      });
  };

  const activeSeasonData = selectedAnime?.seasons.find(s => s.seasonNumber === activeSeason);

  // Mark whole season as complete or pending
  const toggleWholeSeason = (animeId: string, seasonNum: number, markComplete: boolean) => {
    setAnimeList(prev => prev.map(anime => {
      if (anime.id === animeId) {
        return {
          ...anime,
          seasons: anime.seasons.map(s => {
            if (s.seasonNumber === seasonNum) {
              return {
                ...s,
                episodes: s.episodes.map(ep => ({ ...ep, completed: markComplete }))
              };
            }
            return s;
          })
        };
      }
      return anime;
    }));
  };

  const totalCount = animeList.length;
  const watchingCount = animeList.filter(a => (a.status || "Plan to Watch") === "Watching").length;
  const planCount = animeList.filter(a => (a.status || "Plan to Watch") === "Plan to Watch").length;
  const completedCount = animeList.filter(a => (a.status || "Plan to Watch") === "Completed").length;
  const droppedCount = animeList.filter(a => (a.status || "Plan to Watch") === "Dropped").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 font-sans antialiased text-[#C5C6C7] selection:bg-[#66FCF1] selection:text-[#0B0C10]">
      
      {/* Brand Header & Top Stats Pill */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 mt-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 bg-[#66FCF1] rounded-full animate-ping"></span>
            <span className="text-[10px] font-mono font-bold tracking-wider text-[#66FCF1]/80 uppercase">Google Gemini 3.5 Active</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-wide text-white select-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] uppercase font-sans">
            KIZUNA<span className="text-[#66FCF1]/40">.</span>LIST
          </h1>
          <p className="text-[10px] sm:text-xs font-mono text-slate-400 tracking-[0.25em] uppercase mt-1 pl-0.5">
            YOUR ANIME UNIVERSE.
          </p>
        </div>

        {/* Top-Right Premium Stats Panel matching uploaded mockup layout */}
        <div className="bg-[#11131c]/80 backdrop-blur-md border border-[#1b1e2a] rounded-2xl p-4 flex items-center space-x-6 sm:space-x-8 shadow-2xl shrink-0 w-full md:w-auto">
          <div className="text-center flex-1 md:flex-initial">
            <span className="block text-2xl font-black font-sans text-neutral-100">{totalCount}</span>
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">TOTAL</span>
          </div>
          <div className="h-8 w-[1px] bg-neutral-800"></div>
          <div className="text-center flex-1 md:flex-initial">
            <span className="block text-2xl font-black font-sans text-purple-400">{watchingCount}</span>
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">WATCHING</span>
          </div>
          <div className="h-8 w-[1px] bg-neutral-800"></div>
          <div className="text-center flex-1 md:flex-initial">
            <span className="block text-2xl font-black font-sans text-cyan-400">{planCount}</span>
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-400">PLAN</span>
          </div>
          <div className="h-8 w-[1px] bg-neutral-800"></div>
          <div className="text-center flex-1 md:flex-initial">
            <span className="block text-2xl font-black font-sans text-emerald-400">{completedCount}</span>
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">DONE</span>
          </div>
          <div className="h-8 w-[1px] bg-neutral-800"></div>
          <div className="text-center flex-1 md:flex-initial">
            <span className="block text-2xl font-black font-sans text-rose-500">{droppedCount}</span>
            <span className="text-[9px] font-mono tracking-wider font-extrabold text-slate-500 uppercase">DROPPED</span>
          </div>
        </div>
      </div>

      {/* AnimeSuge "add this" interactive link banner */}
      <div className="relative overflow-hidden mb-6 rounded-2xl border border-[#45A29E]/20 bg-[#11131c]/50 p-5 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#66FCF1]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div>
          <div className="text-[10px] text-[#66FCF1] font-mono tracking-widest uppercase mb-1">add this</div>
          <a 
            href="https://animesuge.bid/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-lg md:text-xl font-bold tracking-wide text-white hover:text-[#66FCF1] transition duration-300 group"
            id="animesuge-link"
          >
            animesuge.bid
            <ExternalLink className="w-4 h-4 text-[#45A29E] group-hover:text-[#66FCF1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
          </a>
          <p className="text-xs text-slate-400 mt-1.5 max-w-lg">
            Discover catalog details on AnimeSuge, copy their names, and paste them down below to trigger instant AI autocompletion.
          </p>
        </div>
      </div>

      {/* Beautiful High-Fidelity Unified Add Form matching user mockup */}
      <div className="bg-[#11131c]/70 border border-[#1b1e2a] rounded-2xl p-4 sm:p-5 shadow-xl mb-8">
        <form onSubmit={handleAddAnime} className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Add new anime..."
              value={newAnimeInput}
              onChange={(e) => setNewAnimeInput(e.target.value)}
              className="w-full bg-[#07080c] text-white placeholder-slate-500 font-sans text-sm py-4 pl-4 pr-12 rounded-xl border border-[#1b1e2a] focus:border-[#66FCF1]/60 focus:ring-1 focus:ring-[#66FCF1]/20 transition-all outline-none"
              disabled={!!loadingMessage}
              id="anime-input-field"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-500 font-mono tracking-widest uppercase pointer-events-none hidden md:block">
              GEMINI POWERED
            </div>
          </div>
          
          <div className="relative sm:w-52">
            <select
              value={newAnimeStatus}
              onChange={(e) => setNewAnimeStatus(e.target.value as any)}
              className="w-full bg-[#07080c] text-[#C5C6C7] font-semibold text-xs py-4 px-4 rounded-xl border border-[#1b1e2a] focus:border-[#66FCF1] outline-none cursor-pointer transition appearance-none"
            >
              <option value="Plan to Watch">🔮 Plan to Watch</option>
              <option value="Watching">🔥 Watching</option>
              <option value="Completed">✅ Completed</option>
              <option value="Dropped">💀 Dropped</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
              ▼
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!newAnimeInput.trim() || !!loadingMessage}
            className="py-4 px-8 bg-[#8B5CF6] hover:bg-[#7C3AED] disabled:bg-slate-800 disabled:text-slate-600 font-bold text-xs tracking-wider text-white rounded-xl transition duration-200 uppercase shrink-0"
          >
            + ADD
          </button>
        </form>

        <p className="text-[10px] text-slate-400 mt-2 italic pl-1 flex items-center gap-1">
          <span>💡 Managed AI repairs typos, autodetects abbreviations (e.g. "cote" ➔ "Classroom of the Elite"), and instantly populates complete multi-season episode checklists!</span>
        </p>

        {/* Error notifications */}
        {error && (
          <div className="mt-3 p-3 bg-red-950/40 border border-red-500/30 text-rose-200 text-xs rounded-xl flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div>{error}</div>
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="anime-app-grid">
        
        {/* LEFT COLUMN: Controls and Show List (5 / 12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Search, Filter bar & Lists layout */}
          <div className="bg-[#11131c]/70 rounded-2xl border border-[#1b1e2a] p-5 shadow-xl flex-1 flex flex-col lg:min-h-[640px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono font-bold text-white tracking-wider uppercase">
                Ranking Watchlist
              </h3>
              <button 
                onClick={() => {
                  if (window.confirm("Reload default list with Jujutsu Kaisen (Season 3 Culling Game) and Classroom of the Elite (Season 4)? Your current custom entries will be replaced.")) {
                    localStorage.removeItem("otaku_anime_list");
                    setAnimeList(DEMO_ANIME);
                    setSelectedId("demo-cote");
                    setActiveSeason(1);
                  }
                }}
                className="text-[10px] text-[#66FCF1] hover:text-white transition duration-200 font-mono tracking-tighter"
                title="Restore fresh preset database items"
              >
                [ RESET PRESETS ]
              </button>
            </div>

            {/* Mockup filter tabs segment */}
            <div className="flex border-b border-[#1b1e2a] mb-4 overflow-x-auto scrollbar-none gap-6 pt-1 pb-1.5 selection:bg-transparent">
              {(['All', 'Watching', 'Plan to Watch', 'Completed', 'Dropped'] as const).map((tab) => {
                const isActive = watchlistTab === tab;
                const label = tab === 'Plan to Watch' ? 'PLAN TO WATCH' : tab.toUpperCase();
                return (
                  <button
                    key={tab}
                    onClick={() => setWatchlistTab(tab)}
                    className={`pb-2 text-[10px] font-bold tracking-widest transition-all uppercase whitespace-nowrap outline-none relative ${
                      isActive 
                        ? "text-white" 
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#8B5CF6] rounded-full shadow-[0_0_8px_rgba(139,92,246,0.6)]"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Search inputs */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search series or studio..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#07080c] text-[#C5C6C7] placeholder-slate-500 text-xs py-2.5 pl-9 pr-4 rounded-lg border border-[#1b1e2a] focus:border-[#8B5CF6]/50 focus:ring-0 outline-none transition"
                />
              </div>

              {/* Genre filter dropdown */}
              <select
                value={filterGenre}
                onChange={(e) => setFilterGenre(e.target.value)}
                className="bg-[#07080c] text-[#C5C6C7] text-xs border border-[#1b1e2a] rounded-lg px-3 outline-none focus:border-[#8B5CF6]/50 transition cursor-pointer"
              >
                <option value="all">All Genres</option>
                {allGenres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Watchlist card scroll container */}
            <div className="space-y-3 flex-1 overflow-y-auto min-h-[420px] lg:h-0 pr-1">
              {filteredAnimeList.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs border border-dashed border-slate-800/60 rounded-xl">
                  {animeList.length === 0 
                    ? "Your watchlist is empty. Add a name above!" 
                    : "No anime match your active search terms."}
                </div>
              ) : (
                filteredAnimeList.map((item, index) => {
                  const isSelected = item.id === selectedId;
                  const progress = getAnimeProgress(item);
                  const isPendingConfirmation = deleteConfirmationId === item.id;

                  const formatAddedDate = (dateStr: string) => {
                    if (!dateStr) return "Added May 23";
                    try {
                      const d = new Date(dateStr);
                      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                      return `Added ${months[d.getMonth()]} ${d.getDate()}`;
                    } catch {
                      return "Added May 23";
                    }
                  };

                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedId(item.id)}
                      className={`relative overflow-hidden group p-5 rounded-2xl cursor-pointer border transition-all duration-300 ${
                        isSelected 
                          ? "bg-[#161a2b]/95 border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.12)]" 
                          : "bg-[#11131c]/60 border-[#1b1e2a]/80 hover:border-[#8B5CF6]/40 hover:bg-[#161a2b]/30"
                      }`}
                    >
                      {/* Giant Backdropped Rank Number watermark */}
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-8xl font-black text-slate-800/15 select-none pointer-events-none tracking-tighter sm:tracking-normal">
                        {index + 1}
                      </div>

                      {/* Rank actions and interactive controls */}
                      <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition duration-200 z-10">
                        {/* Moving up/down rank */}
                        <button
                          onClick={(e) => { e.stopPropagation(); moveUp(index); }}
                          disabled={index === 0}
                          className="p-1 hover:bg-[#07080c] text-slate-400 hover:text-[#66FCF1] rounded disabled:opacity-30 disabled:pointer-events-none transition"
                          title="Move Rank Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); moveDown(index); }}
                          disabled={index === filteredAnimeList.length - 1}
                          className="p-1 hover:bg-[#07080c] text-slate-400 hover:text-[#66FCF1] rounded disabled:opacity-30 disabled:pointer-events-none transition"
                          title="Move Rank Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>

                        {/* Copy details */}
                        <button
                          onClick={(e) => handleCopy(item, e)}
                          className="p-1 hover:bg-[#07080c] text-slate-400 hover:text-cyan-400 rounded transition"
                          title="Copy Full Details Summary"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Safe Delete button */}
                        <button
                          onClick={(e) => handleDeleteTrigger(item.id, e)}
                          className={`p-1.5 rounded transition duration-200 ${
                            isPendingConfirmation 
                              ? "bg-red-900 text-white animate-pulse" 
                              : "hover:bg-[#07080c] text-slate-400 hover:text-red-400"
                          }`}
                          title={isPendingConfirmation ? "Click again to confirm delete" : "Delete Item Safely"}
                        >
                          {isPendingConfirmation ? (
                            <span className="text-[9px] font-mono font-bold px-1 uppercase text-white">TAP AGAIN?</span>
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Main card body with left padding for watermark safety */}
                      <div className="relative pl-12 pt-1 flex flex-col justify-between min-h-[90px]">
                        <div>
                          <p className="font-extrabold text-white tracking-wide text-base md:text-lg leading-snug line-clamp-1 selection:bg-transparent">
                            {item.expandedTitle || item.title}
                          </p>
                          
                          {/* Rating and Studio info */}
                          <div className="flex items-center gap-2 mt-1">
                            {item.rating && item.rating !== "N/A" && (
                              <span className="text-[10px] font-mono font-bold text-amber-500 flex items-center gap-0.5">
                                ★ {item.rating}
                              </span>
                            )}
                            <span className="text-[10px] font-mono text-slate-500">
                              {item.studio || "Unknown Studio"}
                            </span>
                          </div>
                        </div>

                        {/* Status + Added Date custom line inspired by user mockup */}
                        <div className="mt-3 flex flex-wrap items-center gap-2.5">
                          {(() => {
                            const status = item.status || "Plan to Watch";
                            let badgeStyle = "bg-blue-950/40 border border-blue-500/20 text-blue-400";
                            if (status === "Completed") badgeStyle = "bg-emerald-950/40 border border-emerald-500/20 text-emerald-400";
                            if (status === "Watching") badgeStyle = "bg-purple-950/30 border border-purple-500/20 text-purple-400";
                            if (status === "Dropped") badgeStyle = "bg-rose-950/30 border border-rose-500/20 text-rose-400";
                            
                            return (
                              <span className={`text-[9px] font-extrabold tracking-wider px-2 py-0.5 rounded uppercase font-mono ${badgeStyle}`}>
                                {status === "Plan to Watch" ? "PLAN TO WATCH" : status.toUpperCase()}
                              </span>
                            );
                          })()}
                          
                          <span className="text-[10px] font-mono text-slate-500">
                            {formatAddedDate(item.createdAt)}
                          </span>
                        </div>

                        {/* Mini progress bar at the bottom */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                            <span>SAGA PROGRESS</span>
                            <span className="font-bold text-[#66FCF1]">{progress.completed} / {progress.total} EPS ({progress.pct}%)</span>
                          </div>
                          <div className="w-full bg-[#07080c] h-1 rounded-full overflow-hidden">
                            <div 
                              className="bg-[#66FCF1] h-full transition-all duration-300 rounded-full"
                              style={{ width: `${progress.pct}%` }}
                            />
                          </div>
                        </div>

                        {/* Repair option */}
                        {!item.isFixed && (
                          <div className="mt-3 text-right">
                            <button
                              onClick={(e) => { e.stopPropagation(); handleHealWithAI(item.id); }}
                              className="text-[9px] font-mono font-bold bg-[#07080c] text-[#66FCF1] hover:bg-[#66FCF1] hover:text-[#0a0c10] py-1 px-2.5 rounded border border-[#66FCF1]/30 transition-all uppercase"
                            >
                              ⚡ Repair with AI
                            </button>
                          </div>
                        )}

                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Expended Episode Checkpoints dashboard (7 / 12) */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="checkpoint-dashboard">
          
          {selectedAnime ? (
            <div className="bg-[#11131c]/70 rounded-2xl border border-[#1b1e2a] p-6 shadow-xl flex-1 flex flex-col">
              
              {/* Show Hero details summary */}
              <div className="border-b border-[#1b1e2a] pb-5 mb-5 flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8B5CF6] font-bold tracking-widest uppercase bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/25">
                      Dashboard Active
                    </span>
                    {selectedAnime.studio && (
                      <span className="text-[11px] font-mono text-slate-400">
                        {selectedAnime.studio}
                      </span>
                    )}
                  </div>
                  <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white animate-fade-in">
                    {selectedAnime.expandedTitle || selectedAnime.title}
                  </h1>
                  <p className="text-xs text-slate-400 italic max-w-xl">
                    "{selectedAnime.synopsis}"
                  </p>
                </div>
 
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Status update select */}
                  <div className="relative">
                    <select
                      value={selectedAnime.status || "Plan to Watch"}
                      onChange={(e) => {
                        const newStatus = e.target.value as any;
                        setAnimeList(prev => prev.map(a => {
                          if (a.id === selectedAnime.id) {
                            return { ...a, status: newStatus };
                          }
                          return a;
                        }));
                      }}
                      className="bg-[#0b0c10] text-[#66FCF1] border border-[#1b1e2a] rounded-xl px-3.5 py-2 text-xs font-semibold outline-none cursor-pointer focus:border-[#66FCF1] select-none h-full transition appearance-none pr-8"
                    >
                      <option value="Plan to Watch">🔮 Plan to Watch</option>
                      <option value="Watching">🔥 Watching</option>
                      <option value="Completed">✅ Completed</option>
                      <option value="Dropped">💀 Dropped</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[9px]">
                      ▼
                    </div>
                  </div>

                  {/* Copy helper */}
                  <button
                    onClick={(e) => handleCopy(selectedAnime, e)}
                    className="flex items-center gap-1 py-1.5 px-3 bg-[#0B0C10] border border-[#45A29E]/30 text-[#66FCF1] hover:text-white hover:bg-[#1F2833] rounded-lg text-xs font-mono transition"
                    title="Export text synopsis summary"
                  >
                    {copiedId === selectedAnime.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-teal-400" />
                        COPIED
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        COPY INFO
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Seasons Selector Tabs Row */}
              <div className="mb-6">
                <div className="text-[#66FCF1] font-mono text-xs uppercase tracking-wider mb-2">
                  Browse Anime Seasons
                </div>
                {selectedAnime.seasons && selectedAnime.seasons.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedAnime.seasons.map((s) => {
                      const isActive = s.seasonNumber === activeSeason;
                      // Find progress in this season
                      const seasonEpTotal = s.episodes.length;
                      const seasonEpCompleted = s.episodes.filter(e => e.completed).length;
                      const seasonPct = seasonEpTotal ? Math.round((seasonEpCompleted / seasonEpTotal) * 100) : 0;

                      return (
                        <button
                          key={s.seasonNumber}
                          onClick={() => setActiveSeason(s.seasonNumber)}
                          className={`flex items-center gap-2 py-2 px-3.5 rounded-xl border font-mono text-xs transition duration-200 ${
                            isActive
                              ? "bg-[#1F2833] border-[#66FCF1] text-[#66FCF1] font-bold shadow-[0_0_10px_rgba(102,252,241,0.15)]"
                              : "bg-[#0B0C10] border-[#45A29E]/25 text-slate-400 hover:text-slate-200 hover:border-[#66FCF1]/30"
                          }`}
                        >
                          <Tv className="w-3.5 h-3.5" />
                          Season {s.seasonNumber}
                          <span className={`text-[10px] px-1 py-0.2 rounded-md ${
                            seasonPct === 100 
                              ? "bg-[#66FCF1]/20 text-[#66FCF1]" 
                              : "bg-slate-800 text-slate-400"
                          }`}>
                            {seasonEpCompleted}/{seasonEpTotal}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-slate-500 text-xs font-mono py-2">
                    No seasons fetched. Repair with AI above.
                  </div>
                )}
              </div>

              {/* Active Season Episodes list */}
              {activeSeasonData ? (
                <div className="flex-1 flex flex-col" id="episodes-container">
                  <div className="flex items-center justify-between bg-[#0B0C10]/60 border border-[#45A29E]/25 p-3 rounded-xl mb-4 text-xs font-mono">
                    <span className="text-slate-400">
                      Season {activeSeason} Episode Guide ({activeSeasonData.episodes.length} episodes)
                    </span>
                    <div className="flex gap-2 text-[10px] font-mono">
                      <button
                        onClick={() => toggleWholeSeason(selectedAnime.id, activeSeason, true)}
                        className="py-1 px-2.5 bg-[#0B0C10] border border-[#45A29E]/30 hover:border-[#66FCF1] rounded text-[#66FCF1] hover:text-white"
                      >
                        All Caught Up
                      </button>
                      <button
                        onClick={() => toggleWholeSeason(selectedAnime.id, activeSeason, false)}
                        className="py-1 px-2.5 bg-[#0B0C10] border border-[#45A29E]/30 hover:border-red-500 rounded text-slate-400 hover:text-white"
                      >
                        Reset Checkpoints
                      </button>
                    </div>
                  </div>

                  {/* Episodes GRID box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                    {activeSeasonData.episodes.map((ep) => {
                      const idMarker = `ep-${selectedAnime.id}-${activeSeason}-${ep.episodeNumber}`;
                      return (
                        <div
                          key={ep.episodeNumber}
                          onClick={() => handleToggleEpisode(selectedAnime.id, activeSeason, ep.episodeNumber)}
                          className={`group/ep p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-3 ${
                            ep.completed 
                              ? "bg-[#66FCF1]/10 border-[#66FCF1]/50 hover:border-[#66FCF1] shadow-[0_0_10px_rgba(102,252,241,0.05)]" 
                              : "bg-[#0B0C10] border-[#45A29E]/25 hover:border-[#66FCF1]/50"
                          }`}
                          id={idMarker}
                        >
                          <div className={`mt-0.5 shrink-0 transition-transform active:scale-95 ${
                            ep.completed ? "text-[#66FCF1]" : "text-slate-600 group-hover/ep:text-slate-400"
                          }`}>
                            {ep.completed ? (
                              <CheckSquare className="w-4 h-4 fill-[#66FCF1]/10" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-slate-400">
                                EP {ep.episodeNumber}
                              </span>
                              {ep.completed && (
                                <span className="text-[8px] font-mono bg-[#66FCF1]/20 text-[#66FCF1] px-1.5 py-0.2 rounded uppercase tracking-wider font-extrabold border border-[#66FCF1]/30 animate-pulse">
                                  Done
                                </span>
                              )}
                            </div>
                            <p className={`text-xs font-semibold leading-tight line-clamp-2 ${
                              ep.completed ? "text-slate-300" : "text-slate-200"
                            }`}>
                              {ep.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Complete/Progress review message banner */}
                  {activeSeasonData.episodes.every(e => e.completed) && (
                    <div className="mt-5 p-3.5 bg-[#66FCF1]/15 border border-[#66FCF1]/35 rounded-xl flex items-center gap-3 animate-pulse">
                      <Flame className="w-5 h-5 text-[#66FCF1]" />
                      <div className="text-xs">
                        <span className="font-bold text-white block">Season {activeSeason} completed!</span>
                        <span className="text-slate-300">You are completely up to date with this saga. Fire up your next rank!</span>
                      </div>
                    </div>
                  )}

                </div>
              ) : (
                <div className="text-center py-16 text-slate-500 text-xs font-mono">
                  No active season data to render. Check the upper repair.
                </div>
              )}

            </div>
          ) : (
            <div className="bg-[#11131c]/70 rounded-2xl border border-[#1b1e2a] p-12 shadow-xl flex-1 flex flex-col justify-center items-center text-center">
              <Film className="w-12 h-12 text-[#8B5CF6]/40 mb-3" />
              <h3 className="font-bold text-slate-200">No Anime Selected</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm">
                Add an anime and select it from the sidebar list to load its episode watchlist checklist.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Full screen static loader */}
      {loadingMessage && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex flex-col justify-center items-center z-50">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-[#66FCF1]/10 border-t-2 border-t-[#66FCF1] animate-spin mb-4" />
            <Sparkles className="w-6 h-6 text-[#66FCF1] absolute inset-0 m-auto" />
          </div>
          <div className="text-[#66FCF1] text-sm font-semibold max-w-md text-center p-4 animate-pulse">
            {loadingMessage}
          </div>
          <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase mt-1">
            Google Gemini 3.5 Engine Connected
          </div>
        </div>
      )}

    </div>
  );
}
