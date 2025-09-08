export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  services: string[];
  popular?: boolean;
  badge?: string;
}

export interface StyleTrend {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'haircut' | 'beard' | 'style' | 'grooming';
  trending: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
}
