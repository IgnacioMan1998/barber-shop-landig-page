import { Component, OnInit, OnDestroy, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);
  
  isScrolled = false;
  isMobileMenuOpen = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.pageYOffset > 50;
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (isPlatformBrowser(this.platformId) && window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Inicializar animaciones del header
      this.initHeaderAnimations();
    }
  }

  ngOnDestroy() {
    // Limpiar event listeners si es necesario
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevenir scroll del body cuando el menú está abierto
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Altura del header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    
    // Cerrar menú móvil si está abierto
    if (this.isMobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }

  private initHeaderAnimations() {
    // Animación inicial del header
    this.animationService.heroEntryAnimation('.header');
    
    // Configurar animación sticky del navbar
    this.animationService.stickyNavAnimation('.header');
  }
}
