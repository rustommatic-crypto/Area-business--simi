
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppMode {
  CHAT = 'CHAT',
  TV = 'TV',
  HUSTLE = 'HUSTLE', // Vendor Hub
  SHOPPER = 'SHOPPER', // Area Shopper
  DIRECTORY = 'DIRECTORY', // Global Business Directory (formerly Supply)
  ADMIN = 'ADMIN'
}

export type VideoErrorType = 'BILLING' | 'SERVER' | 'AUTH' | 'QUOTA' | 'UNKNOWN' | null;

export interface VideoTask {
  id: string;
  source: AppMode;
  script: string;
  baseImage?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  url?: string;
  error?: string;
  progressMessage?: string;
  targetId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
}

export interface TVShow {
  id: string;
  title: string;
  type: 'HUSTLE_TOUR' | 'MARKET_TRENDS' | 'MARKET_DEMAND' | 'GOSSIP' | 'GAME_SHOW';
  thumbnailUrl: string;
  videoUrl?: string;
  description: string;
  views: number;
}

export interface BusinessNode {
  id: string;
  name: string;
  type: 'VENDOR' | 'OFFICE' | 'WHOLESALER' | 'MANUFACTURER' | 'SERVICE';
  category: string;
  area: string;
  location: string;
  reliability: number;
  tags: string[];
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid';
  deliveryRider?: string;
}

export interface VendorPromotion {
  id: string;
  businessName: string;
  location: string;
  category: string;
  socials?: { instagram?: string; tiktok?: string; whatsapp?: string };
  inventory?: InventoryItem[];
  shopImageUrl: string | null;
  vendorVideoUrl?: string | null;
  promoVideoUrl: string | null;
  status: 'active' | 'pending' | 'rejected';
  timestamp?: Date;
  onboardingStatus?: 'completed' | 'pending';
  views: number;
}

export interface WardrobeItem {
  id: string;
  name: string;
  prompt: string;
}

export interface WhatsAppStatus {
  id: string;
  text: string;
  type: string;
  emoji: string;
}

/** 
 * Added missing types used in LongFormStudio, SimiWorld, AdminPanel, SocialHub, and SupplyChain 
 */

export type EpisodeTheme = 'MARKET' | 'TECH' | 'MOTIVATION' | 'STREET';

export interface VideoSegment {
  id: string;
  status: 'queued' | 'generating' | 'completed' | 'failed';
  videoUrl?: string;
  script: string;
}

export interface LongFormState {
  title: string;
  segments: VideoSegment[];
  isProcessing: boolean;
  isStoryboarding: boolean;
  theme?: EpisodeTheme;
}

export interface FeaturedEpisode {
  id: string;
  title: string;
  thumbnailUrl: string;
  theme: string;
  duration: string;
  views: number;
}

export interface AdminStats {
  totalRevenue: number;
  activeVendors: number;
  pendingReviews: number;
  globalReach: number;
}

export interface SocialProfile {
  platform: 'TIKTOK' | 'INSTAGRAM' | 'WHATSAPP' | 'X';
  handle: string;
  followers: number;
  engagementRate: string;
  isConnected: boolean;
}

export interface SupplyNode {
  name: string;
  type: string;
  location: string;
  reliability: number;
  category: string;
}
