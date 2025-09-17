import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Service, ServiceCategory } from '../models/service.interface';
import { TeamMember } from '../models/team-member.interface';
import { Testimonial } from '../models/testimonial.interface';
import { ContactInfo, ContactForm } from '../models/contact.interface';
import { ResponsiveService, ScreenSize } from './responsive';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private responsiveService = inject(ResponsiveService);

  private readonly services: Service[] = [
    {
      id: 1,
      name: 'Classic Haircut',
      description: 'Traditional barbershop haircut with scissors and clipper',
      price: 25,
      duration: 45,
      image: '/assets/images/services/classic-haircut.jpg',
      category: ServiceCategory.HAIRCUT
    },
    {
      id: 2,
      name: 'Beard Trim',
      description: 'Professional beard shaping and trimming',
      price: 18,
      duration: 30,
      image: '/assets/images/services/beard-trim.jpg',
      category: ServiceCategory.BEARD
    },
    {
      id: 3,
      name: 'Hot Towel Shave',
      description: 'Luxury straight razor shave with hot towel treatment',
      price: 35,
      duration: 60,
      image: '/assets/images/services/hot-towel-shave.jpg',
      category: ServiceCategory.BEARD
    },
    {
      id: 4,
      name: 'Hair Styling',
      description: 'Modern hair styling with premium products',
      price: 30,
      duration: 40,
      image: '/assets/images/services/hair-styling.jpg',
      category: ServiceCategory.STYLING
    }
  ];

  private readonly teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Marcus Johnson',
      position: 'Master Barber',
      bio: 'With over 15 years of experience, Marcus specializes in classic cuts and modern styling.',
      image: '/assets/images/team/marcus.jpg',
      experience: 15,
      specialties: ['Classic Cuts', 'Beard Styling', 'Hot Towel Shaves'],
      socialMedia: {
        instagram: '@marcus_barber',
        facebook: 'marcus.johnson.barber'
      }
    },
    {
      id: 2,
      name: 'David Rodriguez',
      position: 'Senior Barber',
      bio: 'Creative stylist known for modern cuts and innovative beard designs.',
      image: '/assets/images/team/david.jpg',
      experience: 8,
      specialties: ['Modern Cuts', 'Fade Styles', 'Creative Designs'],
      socialMedia: {
        instagram: '@david_cuts',
        twitter: '@davidbarber'
      }
    },
    {
      id: 3,
      name: 'Antonio Silva',
      position: 'Barber',
      bio: 'Passionate about traditional barbering techniques and customer service.',
      image: '/assets/images/team/antonio.jpg',
      experience: 5,
      specialties: ['Traditional Cuts', 'Pompadours', 'Mustache Styling'],
      socialMedia: {
        instagram: '@antonio_barber'
      }
    }
  ];

  private readonly testimonials: Testimonial[] = [
    {
      id: 1,
      clientName: 'John Smith',
      clientImage: '/assets/images/clients/john.jpg',
      rating: 5,
      comment: 'Best barbershop in town! Marcus always knows exactly what I need.',
      date: new Date('2024-01-15'),
      service: 'Classic Haircut'
    },
    {
      id: 2,
      clientName: 'Michael Brown',
      rating: 5,
      comment: 'Amazing hot towel shave experience. Will definitely come back!',
      date: new Date('2024-01-20'),
      service: 'Hot Towel Shave'
    },
    {
      id: 3,
      clientName: 'Robert Wilson',
      rating: 5,
      comment: 'David gave me the perfect fade. Highly recommended!',
      date: new Date('2024-01-25'),
      service: 'Hair Styling'
    }
  ];

  private readonly contactInfo: ContactInfo = {
    email: 'info@rubickbarbershop.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Downtown, NY 10001',
    workingHours: {
      monday: '9:00 AM - 7:00 PM',
      tuesday: '9:00 AM - 7:00 PM',
      wednesday: '9:00 AM - 7:00 PM',
      thursday: '9:00 AM - 8:00 PM',
      friday: '9:00 AM - 8:00 PM',
      saturday: '8:00 AM - 6:00 PM',
      sunday: '10:00 AM - 5:00 PM'
    },
    socialMedia: {
      instagram: '@rubickbarbershop',
      facebook: 'RubickBarbershop',
      twitter: '@rubickbarber',
      whatsapp: '+1555123456'
    }
  };

  constructor() { }

  private simulateError(): boolean {
    // Simulate occasional errors for testing (10% chance)
    return Math.random() < 0.1;
  }

  private validateContactForm(formData: ContactForm): string | null {
    if (!formData.name || formData.name.trim().length < 2) {
      return 'Name must be at least 2 characters long.';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please provide a valid email address.';
    }
    if (!formData.message || formData.message.trim().length < 10) {
      return 'Message must be at least 10 characters long.';
    }
    return null;
  }

  getServices(limit?: number): Observable<Service[]> {
    console.log('Fetching services...');
    if (this.simulateError()) {
      return throwError(() => new Error('Failed to fetch services'));
    }

    const responsiveLimit = limit || this.getResponsiveLimit('services');
    const limitedServices = this.services.slice(0, responsiveLimit);

    return of(limitedServices).pipe(
      catchError(error => {
        console.error('Error fetching services:', error);
        return throwError(() => error);
      })
    );
  }

  getServicesByCategory(category: ServiceCategory): Observable<Service[]> {
    console.log(`Fetching services for category: ${category}`);
    if (this.simulateError()) {
      return throwError(() => new Error(`Failed to fetch services for category ${category}`));
    }
    const filteredServices = this.services.filter(service => service.category === category);
    return of(filteredServices).pipe(
      catchError(error => {
        console.error(`Error fetching services for category ${category}:`, error);
        return throwError(() => error);
      })
    );
  }

  getTeamMembers(limit?: number): Observable<TeamMember[]> {
    console.log('Fetching team members...');
    if (this.simulateError()) {
      return throwError(() => new Error('Failed to fetch team members'));
    }

    const responsiveLimit = limit || this.getResponsiveLimit('team');
    const limitedTeamMembers = this.teamMembers.slice(0, responsiveLimit);

    return of(limitedTeamMembers).pipe(
      catchError(error => {
        console.error('Error fetching team members:', error);
        return throwError(() => error);
      })
    );
  }

  getTestimonials(limit?: number): Observable<Testimonial[]> {
    console.log('Fetching testimonials...');
    if (this.simulateError()) {
      return throwError(() => new Error('Failed to fetch testimonials'));
    }

    const responsiveLimit = limit || this.getResponsiveLimit('testimonials');
    const limitedTestimonials = this.testimonials.slice(0, responsiveLimit);

    return of(limitedTestimonials).pipe(
      catchError(error => {
        console.error('Error fetching testimonials:', error);
        return throwError(() => error);
      })
    );
  }

  private getResponsiveLimit(dataType: string): number {
    const screenSize = this.responsiveService.currentScreenSize;

    switch (dataType) {
      case 'testimonials':
        return screenSize === 'mobile' ? 2 : screenSize === 'tablet' ? 3 : 5;
      case 'services':
        return screenSize === 'mobile' ? 3 : screenSize === 'tablet' ? 4 : 6;
      case 'team':
        return screenSize === 'mobile' ? 2 : screenSize === 'tablet' ? 3 : 4;
      default:
        return 5;
    }
  }

  getContactInfo(): Observable<ContactInfo> {
    console.log('Fetching contact info...');
    if (this.simulateError()) {
      return throwError(() => new Error('Failed to fetch contact info'));
    }
    return of(this.contactInfo).pipe(
      catchError(error => {
        console.error('Error fetching contact info:', error);
        return throwError(() => error);
      })
    );
  }

  // Submit contact form with validation
  submitContactForm(formData: ContactForm): Observable<boolean> {
    console.log('Submitting contact form...');
    const validationError = this.validateContactForm(formData);
    if (validationError) {
      console.error('Contact form validation error:', validationError);
      return throwError(() => new Error(validationError));
    }
    if (this.simulateError()) {
      return throwError(() => new Error('Failed to submit contact form'));
    }
    // Simulate successful submission
    console.log('Contact form submitted successfully');
    return of(true).pipe(
      catchError(error => {
        console.error('Error submitting contact form:', error);
        return throwError(() => error);
      })
    );
  }
}
