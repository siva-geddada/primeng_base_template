import { DomHandler } from 'primeng/dom';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { AppNewsComponent } from "../news/app.news.component";
import { TopBarComponent } from '../top-bar/top-bar.component';
import { LayoutService } from '../../../core/services/layout.service';
import { SideNavComponent } from "../sideNav/sideNav.component";
@Component({
  selector: 'app-layout',
  imports: [NgClass, RouterOutlet, TopBarComponent, AppNewsComponent, SideNavComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  platformId = inject(PLATFORM_ID);

  layoutService: LayoutService = inject(LayoutService)

  isNewsActive = computed(() => this.layoutService.newsActive());

  isMenuActive = computed(() => this.layoutService.newsActive());

  containerClass = computed(() => {
      return {
          'layout-news-active': this.isNewsActive()
      };
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.layoutService.onPresetChange(this.layoutService.appState().preset ?? 'Aura');
  }
  }
  hideMenu() {
    this.layoutService.hideMenu();
    DomHandler.unblockBodyScroll('blocked-scroll');
}
}
