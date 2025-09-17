export type ContactSocialMediaPlatform = 'instagram' | 'facebook' | 'twitter' | 'whatsapp';

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workingHours: Record<string, string>;
  socialMedia?: Partial<Record<ContactSocialMediaPlatform, string>>;
}

export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  preferredDate?: Date;
}

export type ValidationError = string | null;

export interface ValidationResult {
  isValid: boolean;
  errors: Record<keyof ContactForm, ValidationError>;
}
