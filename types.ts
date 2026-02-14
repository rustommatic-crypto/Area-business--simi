
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppMode {
  CHAT = 'CHAT',
  TV = 'TV',
  BUSINESS = 'BUSINESS', // Simi Business Suite
  SHOPPER = 'SHOPPER', // Area Shopper
  DIRECTORY = 'DIRECTORY', // Global Business Directory
  ADMIN = 'ADMIN'
}

export interface BusinessIntel {
  opportunity: string;
  location: string;
  action: string;
  confidence: number;
}

export interface SocialTask {
  id: string;
  platform: 'TIKTOK' | 'INSTAGRAM' | 'WHATSAPP' | 'X';
  content: string;
  status: 'ready' | 'posted';
  scheduledTime: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
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
  status: 'active' | 'pending' | 'rejected';
  views: number;
  shopImageUrl: string | null;
  // Added properties for marketing and tracking
  vendorVideoUrl: string | null;
  promoVideoUrl: string | null;
  timestamp: Date;
  onboardingStatus: 'completed' | 'pending' | 'failed';
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

// Missing types for LongFormStudio, SimiWorld, SocialHub, TV and SupplyChain components
export type EpisodeTheme = 'MARKET' | 'TECH' | 'MOTIVATION' | 'STREET';

export interface VideoSegment {
  id: string;
  script: string;
  videoUrl?: string;
  status: 'queued' | 'generating' | 'completed';
}

export interface LongFormState {
  isProcessing: boolean;
  isStoryboarding: boolean;
  segments: VideoSegment[];
  theme: EpisodeTheme | null;
  title: string;
}

export interface FeaturedEpisode {
  id: string;
  title: string;
  theme: string;
  duration: string;
  views: number;
  thumbnailUrl: string;
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

export interface TVShow {
  id: string;
  title: string;
  type: string;
  description: string;
  thumbnailUrl: string;
  views: number;
}

export interface SupplyNode {
  name: string;
  type: string;
  location: string;
  reliability: number;
  category: string;
}
