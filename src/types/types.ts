
export type Manufacturer = 'EW' | 'CLEAN' | 'VSF';

export interface FactoryPrice {
  factory: Manufacturer;
  price: number;
  description: string;
}

export interface TechnicalSpecs {
  general?: Record<string, string>;
  case?: Record<string, string>;
  band?: Record<string, string>;
  dial?: Record<string, string>;
  movement?: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'Watches' | 'Handbags' | 'Sunglasses' | 'Jewelry';
  basePrice: number;
  msrp: number;
  image: string;
  images?: string[];
  description: string;
  tags: string[];
  isClone: boolean;
  movement?: 'Automático' | 'Quartzo' | 'Manual';
  factories?: FactoryPrice[];
  specs?: TechnicalSpecs;
}

// Ads Types
export type AdsPlatform = 'Meta' | 'Google' | 'TikTok';
export type CampaignStatus = 'Active' | 'Paused' | 'Rejected' | 'Learning';

export interface AdsMetrics {
  spend: number;
  revenue: number;
  roas: number;
  cpa: number;
  ctr: number;
  cpm: number;
  conversions: number;
  clicks: number;
}

export interface AdsCampaign {
  id: string;
  name: string;
  platform: AdsPlatform;
  status: CampaignStatus;
  dailyBudget: number;
  metrics: AdsMetrics;
  metrics7d: AdsMetrics;
}

export interface AdCreative {
  id: string;
  name: string;
  campaignId: string;
  thumbnail: string;
  ctr: number;
  cpa: number;
  spend: number;
}

export interface AdsAlert {
  id: string;
  severity: 'high' | 'medium' | 'low';
  message: string;
  campaignName?: string;
}

export interface AdsSyncLog {
  id: string;
  timestamp: string;
  agent: 'Catalog' | 'Ads';
  status: 'success' | 'warning' | 'error';
  message: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedFactory?: Manufacturer;
  finalPrice: number;
}

export interface AIResponse {
  suggestion: string;
  recommendedProductIds: string[];
}
