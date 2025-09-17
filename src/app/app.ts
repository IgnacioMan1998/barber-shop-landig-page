import { Component, OnInit, signal, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Import components
import { HeaderComponent } from './components/shared/header/header';
import { Footer } from './components/shared/footer/footer';
import { HeroComponent } from './components/home/hero/hero';
import { About } from './components/home/about/about';
import { Services } from './components/home/services/services';
import { PricingComponent } from './components/home/pricing/pricing';
import { GalleryComponent } from './components/home/gallery/gallery';
import { Team } from './components/home/team/team';
import { TestimonialsComponent } from './components/home/testimonials/testimonials';
import { Contact } from './components/home/contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    Footer,
    HeroComponent,
    About,
    Services,
    PricingComponent,
    GalleryComponent,
    Team,
    TestimonialsComponent,
    Contact
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);

  protected readonly title = signal('Rubick Barbershop');
  showLoading = false; // DESHABILITADO

  ngOnInit() {
    // Loading completamente deshabilitado
    this.showLoading = false;
  }
}