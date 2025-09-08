import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service, ServiceCategory } from '../models/service.interface';
import { TeamMember } from '../models/team-member.interface';
import { Testimonial } from '../models/testimonial.interface';
import { ContactInfo } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private services: Service[] = [
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

  private teamMembers: TeamMember[] = [
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

  private testimonials: Testimonial[] = [
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

  private contactInfo: ContactInfo = {
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

  getServices(): Observable<Service[]> {
    return of(this.services);
  }

  getServicesByCategory(category: ServiceCategory): Observable<Service[]> {
    const filteredServices = this.services.filter(service => service.category === category);
    return of(filteredServices);
  }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(this.teamMembers);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(this.testimonials);
  }

  getContactInfo(): Observable<ContactInfo> {
    return of(this.contactInfo);
  }

  // Simular envío de formulario de contacto
  submitContactForm(formData: any): Observable<boolean> {
    // Aquí iría la lógica para enviar el formulario a un backend
    return of(true);
  }
}
