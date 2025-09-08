export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  experience: number;
  specialties: string[];
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
}
