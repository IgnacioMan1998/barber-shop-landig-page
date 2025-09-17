import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../services/animation';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact implements AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.initContactAnimations();
  }

  private initContactAnimations() {
    // Animación del título de la sección
    this.animationService.sectionTitleAnimation('.section-title');
    
    // Animación del subtítulo
    this.animationService.heroEntryAnimation('.section-subtitle');
    
    // Animación de la información de contacto
    this.animationService.cardScrollAnimation('.contact-info');
    
    // Animación del formulario de contacto
    this.animationService.cardScrollAnimation('.contact-form');
  }
}
