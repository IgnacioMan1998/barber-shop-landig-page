import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationService } from '../../../services/animation';
import { DataService } from '../../../services/data';
import { Testimonial } from '../../../models/testimonial.interface';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  @ViewChildren('testimonialCard') testimonialCards!: QueryList<ElementRef>;

  private animationService = inject(AnimationService);
  private dataService = inject(DataService);

  testimonials: Testimonial[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit() {
    this.loadTestimonials();
  }

  ngAfterViewInit() {
    this.initTestimonialsAnimations();
  }

  private loadTestimonials() {
    this.loading = true;
    this.error = null;
    this.dataService.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials = data;
        this.loading = false;
        console.log('Testimonials loaded successfully');
      },
      error: (err) => {
        this.error = 'Failed to load testimonials. Please try again later.';
        this.loading = false;
        console.error('Error loading testimonials:', err);
      }
    });
  }

  private initTestimonialsAnimations() {
    // Animate section title
    this.animationService.sectionTitleAnimation('.section-title');
    
    // Animate testimonial cards with scroll trigger
    if (this.testimonialCards) {
      this.testimonialCards.forEach(cardRef => {
        this.animationService.cardScrollAnimation(cardRef.nativeElement);
      });
    }
  }
}
