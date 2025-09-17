import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../services/animation';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About implements AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.initAboutAnimations();
  }

  private initAboutAnimations() {
    // Animación del subtítulo
    this.animationService.heroEntryAnimation('.section-subtitle');
    
    // Animación del título de la sección
    this.animationService.sectionTitleAnimation('.section-title', '#about');
  }
}
