export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  category: ServiceCategory;
}

export enum ServiceCategory {
  HAIRCUT = 'haircut',
  BEARD = 'beard',
  STYLING = 'styling',
  TREATMENT = 'treatment'
}
