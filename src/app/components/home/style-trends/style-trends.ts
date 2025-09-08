import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';
import { StyleTrend } from '../../../interfaces/pricing';

@Component({
  selector: 'app-style-trends',
  imports: [CommonModule],
  templateUrl: './style-trends.html',
  styleUrl: './style-trends.css'
})
export class StyleTrendsComponent implements OnInit, AfterViewInit {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  styleTrends: StyleTrend[] = [
    {
      id: 'fade-cut',
      title: 'Modern Fade Cut',
      description: 'Clean, sharp fade with textured top. Perfect for professional and casual looks.',
      imageUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'haircut',
      trending: true,
      difficulty: 'medium'
    },
    {
      id: 'beard-sculpting',
      title: 'Beard Sculpting',
      description: 'Precision beard shaping with straight razor detailing for the modern gentleman.',
      imageUrl: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'beard',
      trending: true,
      difficulty: 'hard'
    },
    {
      id: 'textured-quiff',
      title: 'Textured Quiff',
      description: 'Classic quiff with modern texture and volume. A timeless style with contemporary edge.',
      imageUrl: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'style',
      trending: false,
      difficulty: 'easy'
    },
    {
      id: 'skin-fade',
      title: 'Skin Fade Special',
      description: 'Ultra-smooth skin fade technique with precision blending from our master barbers.',
      imageUrl: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'haircut',
      trending: true,
      difficulty: 'hard'
    },
    {
      id: 'classic-pompadour',
      title: 'Classic Pompadour',
      description: 'Traditional pompadour style with premium pomade finish for that vintage appeal.',
      imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'style',
      trending: false,
      difficulty: 'medium'
    },
    {
      id: 'grooming-package',
      title: 'Full Grooming',
      description: 'Complete grooming experience including facial treatment and premium styling.',
      imageUrl: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'grooming',
      trending: true,
      difficulty: 'easy'
    }
  ];

  selectedCategory: string = 'all';
  categories = [
    { value: 'all', label: 'All Styles' },
    { value: 'haircut', label: 'Haircuts' },
    { value: 'beard', label: 'Beard Care' },
    { value: 'style', label: 'Styling' },
    { value: 'grooming', label: 'Grooming' }
  ];

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTrendsAnimations();
    }
  }

  get filteredTrends(): StyleTrend[] {
    if (this.selectedCategory === 'all') {
      return this.styleTrends;
    }
    return this.styleTrends.filter(trend => trend.category === this.selectedCategory);
  }

  get trendingStyles(): StyleTrend[] {
    return this.styleTrends.filter(trend => trend.trending);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getDifficultyLabel(difficulty: string): string {
    const labels = {
      'easy': 'Quick Style',
      'medium': 'Signature Cut',
      'hard': 'Master Craft'
    };
    return labels[difficulty as keyof typeof labels] || difficulty;
  }

  private initTrendsAnimations() {
    // 🎨 ANIMACIONES ÉPICAS PARA STYLE TRENDS
    
    // Animación del título con reveal dramático
    this.animationService.sectionRevealAnimation('.section-title');
    
    // Animación de filtros con efecto 3D
    this.animationService.heroEntryAnimation('.category-filters');
    
    // Animación stagger espectacular para las cards
    this.animationService.staggerAnimation('.trend-card');
    
    // Animación individual para cada card con efectos 3D
    document.querySelectorAll('.trend-card').forEach((card) => {
      this.animationService.cardScrollAnimation(card);
    });
    
    // Animación mágica para los botones de categoría
    document.querySelectorAll('.category-btn').forEach((btn) => {
      this.animationService.buttonHoverAnimation(btn);
    });
    
    // Animación parallax para las imágenes
    document.querySelectorAll('.trend-image').forEach((img) => {
      this.animationService.parallaxAnimation(img, 0.3);
    });
  }
}
