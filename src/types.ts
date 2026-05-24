export interface EpisodeItem {
  episodeNumber: number;
  title: string;
  completed: boolean;
  airDate?: string;
}

export interface SeasonItem {
  seasonNumber: number;
  episodes: EpisodeItem[];
}

export interface AnimeItem {
  id: string;
  title: string;
  originalQuery: string;
  expandedTitle: string;
  synopsis: string;
  genres: string[];
  imageUrl?: string;
  studio?: string;
  rating?: string;
  rank: number; // For ordering
  seasons: SeasonItem[];
  isFixed: boolean; // True if autocomplete was processed
  createdAt: string;
  status?: 'Watching' | 'Plan to Watch' | 'Completed' | 'Dropped';
}
