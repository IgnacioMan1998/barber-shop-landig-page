export interface Testimonial {
  id: number;
  clientName: string;
  clientImage?: string;
  rating: number;
  comment: string;
  date: Date;
  service: string;
}
