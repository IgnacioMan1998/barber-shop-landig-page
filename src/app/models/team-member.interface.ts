export type SocialMediaPlatform = 'instagram' | 'facebook' | 'twitter';

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  experience: number;
  specialties: string[];
  socialMedia?: Partial<Record<SocialMediaPlatform, string>>;
}
