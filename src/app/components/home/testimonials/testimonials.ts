import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList, inject } from '@angular/core';
import { AnimationService } from '../../../services/animation';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  @ViewChildren('testimonialCard') testimonialCards!: QueryList<ElementRef>;

  private animationService = inject(AnimationService);

  ngOnInit() {}

  ngAfterViewInit() {
    this.initTestimonialsAnimations();
  }

  private initTestimonialsAnimations() {
    // Animate testimonial cards with scroll trigger
    if (this.testimonialCards) {
      this.testimonialCards.forEach(cardRef => {
        this.animationService.cardScrollAnimation(cardRef.nativeElement);
      });
    }
  }
}
