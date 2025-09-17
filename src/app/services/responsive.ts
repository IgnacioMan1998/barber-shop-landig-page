import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type ScreenSize = 'mobile' | 'tablet' | 'desktop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private platformId = inject(PLATFORM_ID);
  private screenSizeSubject = new BehaviorSubject<ScreenSize>('desktop');
  public screenSize$ = this.screenSizeSubject.asObservable();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateScreenSize();
      window.addEventListener('resize', () => this.updateScreenSize());
    }
  }

  private updateScreenSize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const width = window.innerWidth;
    let size: ScreenSize;

    if (width < 768) {
      size = 'mobile';
    } else if (width < 1024) {
      size = 'tablet';
    } else {
      size = 'desktop';
    }

    this.screenSizeSubject.next(size);
  }

  get currentScreenSize(): ScreenSize {
    return this.screenSizeSubject.value;
  }

  isMobile(): boolean {
    return this.currentScreenSize === 'mobile';
  }

  isTablet(): boolean {
    return this.currentScreenSize === 'tablet';
  }

  isDesktop(): boolean {
    return this.currentScreenSize === 'desktop';
  }

  getScreenSize(): Observable<ScreenSize> {
    return this.screenSize$;
  }
}