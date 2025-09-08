import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimationService } from '../../../services/animation';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css'
})
export class GalleryComponent implements OnInit, AfterViewInit {
  private animationService = inject(AnimationService);
  private platformId = inject(PLATFORM_ID);

  galleryImages: GalleryImage[] = [
    {
      id: 'classic-cuts',
      title: 'Classic Gentleman Cut',
      category: 'haircuts',
      imageUrl: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Timeless elegance with modern precision'
    },
    {
      id: 'modern-fade',
      title: 'Modern Fade Mastery',
      category: 'haircuts',
      imageUrl: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Clean fades with artistic detail'
    },
    {
      id: 'beard-styling',
      title: 'Beard Sculpting Art',
      category: 'beard',
      imageUrl: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Precision beard shaping and grooming'
    },
    {
      id: 'vintage-style',
      title: 'Vintage Pompadour',
      category: 'styling',
      imageUrl: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Classic styling with contemporary twist'
    },
    {
      id: 'professional-cut',
      title: 'Executive Business Cut',
      category: 'haircuts',
      imageUrl: 'https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Professional sophistication for the modern man'
    },
    {
      id: 'creative-design',
      title: 'Creative Hair Design',
      category: 'styling',
      imageUrl: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Artistic patterns and unique designs'
    },
    {
      id: 'grooming-deluxe',
      title: 'Deluxe Grooming Experience',
      category: 'grooming',
      imageUrl: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete luxury grooming service'
    },
    {
      id: 'texture-styling',
      title: 'Textured Modern Cut',
      category: 'haircuts',
      imageUrl: 'https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Contemporary texture with natural flow'
    }
  ];

  selectedCategory: string = 'all';
  categories = [
    { value: 'all', label: 'All Work' },
    { value: 'haircuts', label: 'Haircuts' },
    { value: 'beard', label: 'Beard Care' },
    { value: 'styling', label: 'Styling' },
    { value: 'grooming', label: 'Grooming' }
  ];

  ngOnInit() {
    // Initialization logic
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initGalleryAnimations();
    }
  }

  get filteredImages(): GalleryImage[] {
    if (this.selectedCategory === 'all') {
      return this.galleryImages;
    }
    return this.galleryImages.filter(image => image.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    
    // Re-animate filtered images
    setTimeout(() => {
      this.initImageAnimations();
    }, 100);
  }

  trackByImageId(index: number, image: GalleryImage): string {
    return image.id;
  }

  private initGalleryAnimations() {
    // Animación del título con reveal dramático
    this.animationService.sectionRevealAnimation('.gallery-title');
    
    // Animación de filtros con efecto 3D
    this.animationService.heroEntryAnimation('.gallery-filters');
    
    // Animación de las imágenes
    this.initImageAnimations();
    
    // Animación mágica para los botones de categoría
    document.querySelectorAll('.category-btn').forEach((btn) => {
      this.animationService.buttonHoverAnimation(btn);
    });
  }

  private initImageAnimations() {
    // Animación stagger espectacular para las imágenes
    this.animationService.staggerAnimation('.gallery-item');
    
    // Animación individual para cada imagen
    document.querySelectorAll('.gallery-item').forEach((item) => {
      this.animationService.cardScrollAnimation(item);
    });
  }
}
