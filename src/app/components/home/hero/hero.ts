import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('heroBadge') heroBadge!: ElementRef;
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroStats') heroStats!: ElementRef;
  @ViewChild('heroCta') heroCta!: ElementRef;
  @ViewChild('heroSocial') heroSocial!: ElementRef;
  @ViewChild('heroImage') heroImage!: ElementRef;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef;
  @ViewChild('statNumber1') statNumber1!: ElementRef;
  @ViewChild('statNumber2') statNumber2!: ElementRef;
  @ViewChild('statNumber3') statNumber3!: ElementRef;
  @ViewChild('floatingScissors') floatingScissors!: ElementRef;
  @ViewChild('floatingRazor') floatingRazor!: ElementRef;
  @ViewChild('floatingBrush') floatingBrush!: ElementRef;
  @ViewChild('experienceBadge') experienceBadge!: ElementRef;
  @ViewChild('heroParticles') heroParticles!: ElementRef;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.createParticles();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Pequeño delay para asegurar que los elementos estén en el DOM
      setTimeout(() => {
        this.initScrollAnimations();
        
        // Fallback: forzar visibilidad después de 3 segundos
        setTimeout(() => {
          this.forceElementsVisible();
        }, 3000);
      }, 100);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      this.animationService.killAllAnimations();
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  private forceElementsVisible() {
    // 🔧 FORZAR VISIBILIDAD DE TODOS LOS ELEMENTOS
    console.log('Forzando visibilidad de elementos del hero');
    
    const elements = [
      this.heroBadge?.nativeElement,
      this.heroTitle?.nativeElement,
      this.heroSubtitle?.nativeElement,
      this.heroStats?.nativeElement,
      this.heroCta?.nativeElement,
      this.heroSocial?.nativeElement
    ];

    elements.forEach(element => {
      if (element) {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.visibility = 'visible';
      }
    });

    // También forzar las líneas del título
    document.querySelectorAll('.title-line').forEach(line => {
      if (line instanceof HTMLElement) {
        line.style.opacity = '1';
        line.style.transform = 'none';
        line.style.visibility = 'visible';
      }
    });

    // Y las estadísticas
    document.querySelectorAll('.stat-item').forEach(stat => {
      if (stat instanceof HTMLElement) {
        stat.style.opacity = '1';
        stat.style.transform = 'none';
        stat.style.visibility = 'visible';
      }
    });

    // Y los botones
    document.querySelectorAll('.hero-cta .btn').forEach(btn => {
      if (btn instanceof HTMLElement) {
        btn.style.opacity = '1';
        btn.style.transform = 'none';
        btn.style.visibility = 'visible';
      }
    });
  }

  private initHeroAnimations() {
    // 🚀 ANIMACIONES SIMPLES Y EFECTIVAS
    
    // PRIMERO: Asegurar que los elementos estén en estado inicial para animaciones
    gsap.set([
      this.heroBadge.nativeElement,
      '.title-line',
      this.heroSubtitle.nativeElement,
      '.stat-item',
      '.hero-cta .btn'
    ], { 
      opacity: 0, 
      y: 30,
      clearProps: "transform"
    });

    // Configurar animaciones con ScrollTrigger para activarse al hacer scroll
    // Estas animaciones se ejecutarán cuando la sección entre en el viewport
  }

  private ensureVisibilityAfterAnimations() {
    // 🛡️ ASEGURAR VISIBILIDAD DESPUÉS DE ANIMACIONES
    const criticalElements = [
      '.title-line',
      '.hero-badge',
      '.hero-subtitle',
      '.stat-item',
      '.hero-cta .btn'
    ];

    criticalElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          // Verificar si está invisible y corregir
          const computedStyle = window.getComputedStyle(element);
          if (computedStyle.opacity === '0' || computedStyle.visibility === 'hidden') {
            console.log(`Corrigiendo visibilidad de: ${selector}`);
            gsap.set(element, { 
              opacity: 1, 
              visibility: 'visible',
              clearProps: "transform"
            });
          }
        }
      });
    });
  }

  private initFloatingAnimations() {
    // Animación CHEVERE de elementos flotantes con efectos 3D
    const floatingElements = gsap.utils.toArray('.floating-element') as HTMLElement[];
    
    floatingElements.forEach((element, index) => {
      // Entrada dramática
      gsap.fromTo(element, 
        {
          opacity: 0,
          scale: 0.3,
          rotation: Math.random() * 360,
          y: 100
        },
        {
          opacity: 0.8,
          scale: 1,
          rotation: 0,
          y: 0,
          duration: 1.5,
          delay: index * 0.3,
          ease: "back.out(2)"
        }
      );

      // Movimiento flotante continuo CHEVERE
      gsap.to(element, {
        y: Math.random() * 30 - 15,
        x: Math.random() * 20 - 10,
        rotation: Math.random() * 20 - 10,
        scale: 1 + Math.random() * 0.2,
        duration: 3 + Math.random() * 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      });
    });

    // Efectos adicionales cheveres para decoraciones
    gsap.to('.hero-decoration', {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1
    });
  }

  private initCounterAnimations() {
    // Contadores simples
    this.animationService.counterAnimation(this.statNumber1.nativeElement, 15, 2);
    this.animationService.counterAnimation(this.statNumber2.nativeElement, 1200, 2.5);
    this.animationService.counterAnimation(this.statNumber3.nativeElement, 5, 2);
  }

  private initScrollIndicatorAnimation() {
    // Animación CHEVERE de scroll con efectos múltiples
    if (this.scrollIndicator?.nativeElement) {
      // Movimiento principal
      gsap.to(this.scrollIndicator.nativeElement, {
        y: 15,
        duration: 1.5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Efecto de brillo pulsante
      gsap.to(this.scrollIndicator.nativeElement, {
        boxShadow: "0 0 20px rgba(212, 175, 55, 0.6)",
        scale: 1.1,
        duration: 2,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });

      // Rotación sutil
      gsap.to(this.scrollIndicator.nativeElement, {
        rotation: 5,
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }

  // 🔄 NUEVA FUNCIÓN: Configurar todas las animaciones de scroll para la sección hero
  private initScrollAnimations() {
    // Título principal con efecto de entrada
    if (this.heroTitle?.nativeElement) {
      gsap.fromTo(this.heroTitle.nativeElement,
        { 
          opacity: 0, 
          y: 50, 
          scale: 0.95
        },
        {
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Líneas del título con stagger effect
    gsap.fromTo('.title-line',
      { 
        opacity: 0, 
        y: 30,
        rotationX: 90,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1, 
        y: 0,
        rotationX: 0,
        duration: 0.8, 
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".hero",
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Badge del hero
    if (this.heroBadge?.nativeElement) {
      gsap.fromTo(this.heroBadge.nativeElement,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.5,
          rotation: 180
        },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2, 
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Subtítulo
    if (this.heroSubtitle?.nativeElement) {
      gsap.fromTo(this.heroSubtitle.nativeElement,
        { 
          opacity: 0, 
          y: 30,
          rotationY: 25
        },
        {
          opacity: 1, 
          y: 0,
          rotationY: 0,
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
    
    // Estadísticas
    gsap.utils.toArray('.stat-item').forEach((element: any, index: number) => {
      gsap.fromTo(element,
        { 
          opacity: 0, 
          y: 25,
          rotation: 10,
          scale: 0.7
        },
        {
          opacity: 1, 
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 0.6, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Botones CTA
    gsap.utils.toArray('.hero-cta .btn').forEach((element: any, index: number) => {
      gsap.fromTo(element,
        { 
          opacity: 0, 
          y: 20,
          scale: 0.6,
          rotation: -5
        },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 0.6, 
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".hero",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animaciones básicas de elementos flotantes
    this.initFloatingAnimations();

    // Contadores simples
    this.initCounterAnimations();

    // Scroll indicator simple
    this.initScrollIndicatorAnimation();

    // NO HOVER EFFECTS - Para evitar problemas de visibilidad

    // Verificación final de visibilidad después de todas las animaciones
    setTimeout(() => {
      this.ensureVisibilityAfterAnimations();
    }, 2000);
  }

  private createParticles() {
    if (!this.heroParticles?.nativeElement) return;

    const particlesContainer = this.heroParticles.nativeElement;
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 10 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
      particlesContainer.appendChild(particle);
    }
  }
}
