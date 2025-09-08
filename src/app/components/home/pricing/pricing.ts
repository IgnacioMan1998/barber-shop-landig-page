import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';
import { PricingPlan } from '../../../interfaces/pricing';

@Component({
  selector: 'app-pricing',
  imports: [CommonModule],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class PricingComponent implements OnInit, AfterViewInit {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Classic Cut',
      price: 35,
      duration: '45 min',
      description: 'Traditional haircut with consultation and styling',
      services: [
        'Hair consultation',
        'Precision haircut',
        'Shampoo & condition',
        'Basic styling',
        'Hot towel finish'
      ]
    },
    {
      id: 'premium',
      name: 'The Gentleman',
      price: 65,
      duration: '75 min',
      description: 'Complete grooming experience with premium products',
      services: [
        'Everything in Classic Cut',
        'Beard trim & shaping',
        'Premium product styling',
        'Scalp massage',
        'Eyebrow trimming',
        'Cologne application'
      ],
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'deluxe',
      name: 'Royal Treatment',
      price: 95,
      duration: '90 min',
      description: 'Ultimate luxury barbering experience',
      services: [
        'Everything in The Gentleman',
        'Hot towel facial treatment',
        'Straight razor neck shave',
        'Premium beard oil treatment',
        'Hair wash with luxury products',
        'Complimentary beverage',
        'Take-home styling product'
      ],
      badge: 'Premium'
    }
  ];

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initPricingAnimations();
    }
  }

  private initPricingAnimations() {
    // 🎪 ANIMACIONES ESPECTACULARES PARA LAS CARDS
    
    // Animación del título con reveal dramático
    this.animationService.sectionRevealAnimation('.pricing-title');
    
    // Animación stagger increíble para las cards
    this.animationService.staggerAnimation('.pricing-card');
    
    // Animación individual para cada card con scroll trigger
    document.querySelectorAll('.pricing-card').forEach((card) => {
      this.animationService.cardScrollAnimation(card);
    });
    
    // Animación mágica para los botones
    document.querySelectorAll('.pricing-btn').forEach((btn) => {
      this.animationService.buttonHoverAnimation(btn);
    });
  }

  selectPlan(plan: PricingPlan) {
    // Handle plan selection - could integrate with booking system
    console.log('Selected plan:', plan);
    // This could trigger a booking modal or navigate to booking page
  }
}
