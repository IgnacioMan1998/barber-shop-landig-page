import { Component, AfterViewInit } from '@angular/core';
import { AnimationService } from '../../../services/animation';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services implements AfterViewInit {

  constructor(private animationService: AnimationService) {}

  ngAfterViewInit() {
    this.initServicesAnimations();
  }

  private initServicesAnimations() {
    // Animación del subtítulo
    this.animationService.heroEntryAnimation('.section-subtitle');
  }
}
