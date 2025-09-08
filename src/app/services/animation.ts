import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  // 🚀 ANIMACIÓN SIMPLE DE ENTRADA HERO
  heroEntryAnimation(element: string | Element): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    
    tl.fromTo(element, 
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
        ease: "power2.out"
      }
    );
    
    return tl;
  }

  // 🎭 ANIMACIÓN DE TEXTO REVELADO
  textRevealAnimation(element: string | Element): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;
    
    const tl = gsap.timeline();
    
    tl.fromTo(element,
      { 
        opacity: 0, 
        rotationX: 90,
        transformOrigin: "center bottom",
        scale: 0.5
      },
      { 
        opacity: 1, 
        rotationX: 0,
        scale: 1,
        duration: 1.2, 
        ease: "back.out(1.7)",
        force3D: true
      }
    );
    
    return tl;
  }

  // 🎪 ANIMACIÓN SIMPLE DE CARDS CON SCROLL
  cardScrollAnimation(element: string | Element): void {
    if (!this.isBrowser) return;
    
    // Animación simple y elegante
    gsap.fromTo(element,
      { 
        opacity: 0, 
        y: 50
      },
      {
        opacity: 1, 
        y: 0,
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  // 🌟 ANIMACIÓN STAGGER SIMPLE
  staggerAnimation(elements: string): void {
    if (!this.isBrowser) return;

    gsap.fromTo(elements, 
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: elements,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  // 🎈 ANIMACIÓN DE BOTONES CON EFECTO MÁGICO
  buttonHoverAnimation(element: string | Element): gsap.core.Timeline | null {
    if (!this.isBrowser) return null;

    const tl = gsap.timeline({ paused: true });
    
    tl.to(element, {
      scale: 1.1,
      rotation: 360,
      duration: 0.6,
      ease: "back.out(1.7)"
    });

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (el) {
      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());
    }

    return tl;
  }

  // 🌊 ANIMACIÓN DE PARALLAX SUAVE
  parallaxAnimation(element: string | Element, speed: number = 0.5): void {
    if (!this.isBrowser) return;

    gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }

  // 🔢 ANIMACIÓN DE CONTADORES CON EFECTO INCREMENTAL
  counterAnimation(element: string | Element, endValue: number, duration: number = 2): void {
    if (!this.isBrowser) return;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    if (!el) return;

    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: endValue,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString();
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    });
  }

  // 🎢 ANIMACIÓN DE SECCIÓN CON REVEAL DRAMÁTICO
  sectionRevealAnimation(element: string | Element): void {
    if (!this.isBrowser) return;

    gsap.fromTo(element,
      {
        opacity: 0,
        y: 100,
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
      },
      {
        opacity: 1,
        y: 0,
        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }

  // 🧹 LIMPIAR TODAS LAS ANIMACIONES
  killAllAnimations(): void {
    if (!this.isBrowser) return;
    gsap.killTweensOf("*");
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }

  // 📱 ANIMACIÓN DE NAVEGACIÓN STICKY
  stickyNavAnimation(element: string | Element): void {
    if (!this.isBrowser) return;

    ScrollTrigger.create({
      trigger: "body",
      start: "100px top",
      end: "bottom bottom",
      onToggle: (self) => {
        if (self.isActive) {
          // Navbar se vuelve sticky con efecto
          gsap.to(element, {
            y: 0,
            backgroundColor: "rgba(15, 15, 15, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          // Navbar vuelve a su estado original
          gsap.to(element, {
            backgroundColor: "rgba(15, 15, 15, 0.8)",
            backdropFilter: "blur(0px)",
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });
  }
}
