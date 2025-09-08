export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  workingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    whatsapp?: string;
  };
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredDate?: Date;
}
