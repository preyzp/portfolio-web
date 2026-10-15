export type Project = {
  slug: string; title: string; category: string; summary: string;
  platform: string; industry: string; role: string; status: string;
  cover: string; thumbnail: string; artwork: string; content: string;
  featured: boolean; featuredOrder: number; order: number;
  featuredTitle: string; featuredSummary: string;
  liveUrl?: string; techStack?: string[];
};
