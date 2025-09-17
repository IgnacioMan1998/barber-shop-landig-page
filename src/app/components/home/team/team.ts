import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';
import { ResponsiveService } from '../../../services/responsive';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  description: string;
  experience: string;
}

@Component({
  selector: 'app-team',
  imports: [CommonModule],
  templateUrl: './team.html',
  styleUrl: './team.css'
})
export class Team implements OnInit, AfterViewInit {
  @ViewChild('teamContainer', { static: false }) teamContainer!: ElementRef;
  private animationService = inject(AnimationService);
  private responsiveService = inject(ResponsiveService);
  private platformId = inject(PLATFORM_ID);

  teamMembers: TeamMember[] = [
    {
      id: 'marcus-johnson',
      name: 'Marcus Johnson',
      role: 'Master Barber',
      imageUrl: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: '15+ years of experience in classic and modern cuts. Expert in traditional barbering.',
      experience: '15+ Years'
    },
    {
      id: 'david-rodriguez',
      name: 'David Rodriguez',
      role: 'Senior Barber',
      imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Creative stylist specializing in modern cuts and fades. Passionate about fresh trends.',
      experience: '12+ Years'
    },
    {
      id: 'antonio-silva',
      name: 'Antonio Silva',
      role: 'Expert Barber',
      imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Master of traditional techniques with exceptional customer service.',
      experience: '10+ Years'
    }
  ];

  ngOnInit() {
    // Initialization logic
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Registrar plugins de GSAP
      gsap.registerPlugin(ScrollTrigger);

      setTimeout(() => {
        if (!this.responsiveService.isMobile()) {
          this.initHorizontalScroll();
          this.initTextAnimations();
        }
        this.initTeamAnimations();
      }, 100);
    }
  }

  private initHorizontalScroll() {
    try {
      const teamEl = this.teamContainer.nativeElement;
      const imagesContainer = teamEl.querySelector('.team-images');
      const images = teamEl.querySelectorAll('.team-item');

      if (!imagesContainer || images.length === 0) {
        console.warn('Team container or images not found');
        return;
      }

      // Configurar el scroll horizontal para 3 elementos
      const totalWidth = images.length * (400 + 24); // 400px width + 24px gap

      gsap.set(imagesContainer, {
        width: totalWidth + 'px'
      });

      // Solo crear scroll si el contenido es más ancho que la ventana
      if (totalWidth > window.innerWidth) {
        gsap.to(imagesContainer, {
          x: () => -(totalWidth - window.innerWidth + 100),
          ease: "none",
          scrollTrigger: {
            trigger: teamEl,
            start: "top bottom",
            end: () => `+=${totalWidth * 0.5}`, // Reducir la distancia de scroll
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          }
        });
      }
      console.log('Horizontal scroll initialized successfully');
    } catch (error) {
      console.error('Error initializing horizontal scroll:', error);
    }
  }

  private initTextAnimations() {
    try {
      const teamEl = this.teamContainer.nativeElement;
      const animatedTexts = teamEl.querySelectorAll('.animate-text');

      animatedTexts.forEach((text: Element, index: number) => {
        const lines = text.querySelectorAll('.text-line');
        const reveals = text.querySelectorAll('.text-reveal');

        // Crear timeline para cada texto
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: text,
            start: "left 80%",
            end: "right 20%",
            toggleActions: "play none none reverse",
            onEnter: () => text.classList.add('active'),
            onLeave: () => text.classList.remove('active'),
            onEnterBack: () => text.classList.add('active'),
            onLeaveBack: () => text.classList.remove('active'),
          }
        });

        // Animar las líneas de texto
        if (lines.length > 0) {
          tl.fromTo(lines,
            {
              y: 100,
              opacity: 0,
              rotationX: 90
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)"
            }
          );
        }

        // Animar elementos de reveal
        if (reveals.length > 0) {
          tl.fromTo(reveals,
            {
              scaleX: 0,
              transformOrigin: "left center"
            },
            {
              scaleX: 1,
              duration: 0.6,
              stagger: 0.05,
              ease: "power2.out"
            },
            "-=0.3"
          );
        }

        // Efecto de brillo en los números
        const imageNumber = text.querySelector('.image-number');
        if (imageNumber) {
          tl.to(imageNumber,
            {
              backgroundPosition: "200% center",
              duration: 1.5,
              ease: "power2.inOut"
            },
            "-=0.5"
          );
        }
      });
      console.log('Text animations initialized successfully');
    } catch (error) {
      console.error('Error initializing text animations:', error);
    }
  }

  private initTeamAnimations() {
    try {
      // Animación del título con reveal dramático
      this.animationService.sectionTitleAnimation('.section-title', '#team');

      // Animación del subtítulo
      this.animationService.heroEntryAnimation('.section-subtitle');

      // Animación individual para cada imagen - lighter on mobile
      if (!this.responsiveService.isMobile()) {
        document.querySelectorAll('.team-item').forEach((item) => {
          this.animationService.cardScrollAnimation(item);
        });
      }
      console.log('Team animations initialized successfully');
    } catch (error) {
      console.error('Error initializing team animations:', error);
    }
  }
}
