import { FormsModule } from '@angular/forms';
import News from '@/src/assets/data/news.json';
import { CommonModule } from '@angular/common';
import { LayoutService } from '../../../core/services/layout.service';
import { afterNextRender, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
    selector: 'app-news',
    standalone: true,
    templateUrl: './app.news.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule]
})
export class AppNewsComponent {
    storageKey: string = 'primeng';

    announcement: any;

    layoutService: LayoutService = inject(LayoutService)
    cd: ChangeDetectorRef = inject(ChangeDetectorRef)

    constructor() {
        afterNextRender(() => {
            const itemString = localStorage.getItem(this.storageKey);

            if (itemString) {
                const item = JSON.parse(itemString);

                if (!item.hiddenNews || item.hiddenNews !== News.id) {
                    this.layoutService.newsActive.set(true);
                    this.announcement = News;
                } else {
                    this.layoutService.newsActive.set(false);
                }
            } else {
                this.layoutService.newsActive.set(true);
                this.announcement = News;
            }
            this.cd.markForCheck();
        });
    }

    get isNewsActive(): boolean {
        return this.layoutService.newsActive();
    }

    hideNews() {
        this.layoutService.hideNews();
        const item = {
            hiddenNews: this.announcement.id
        };

        localStorage.setItem(this.storageKey, JSON.stringify(item));
    }
}
