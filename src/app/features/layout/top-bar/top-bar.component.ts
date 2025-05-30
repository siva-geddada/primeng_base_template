import { RouterLink } from '@angular/router';
import { StyleClass } from 'primeng/styleclass';
import { DOCUMENT, NgClass } from '@angular/common';
import { AppConfiguratorComponent } from '../config/app.config';
import { LayoutService } from '../../../core/services/layout.service';
import {
    Inject,
    inject,
    Input,
    computed,
    Component,
    Renderer2,
    ElementRef,
    afterNextRender,
    booleanAttribute,
} from '@angular/core';
@Component({
    selector: 'app-topbar',
    styleUrl: './top-bar.component.scss',
    templateUrl: './top-bar.component.html',
    imports: [RouterLink, NgClass, StyleClass, AppConfiguratorComponent],
})
export class TopBarComponent {
    window!: Window;

    scrollListener!: VoidFunction | null;

    layoutService = inject(LayoutService);

    @Input({ transform: booleanAttribute }) showConfigurator = true;

    isDarkMode = computed(() => this.layoutService.appState().darkTheme);

    constructor(
        private readonly el: ElementRef,
        private readonly renderer: Renderer2,
        @Inject(DOCUMENT) private readonly document: Document
    ) {
        this.window = this.document.defaultView as Window;

        afterNextRender(() => {
            this.bindScrollListener();
        });
    }

    toggleDarkMode() {
        this.layoutService.appState.update(state => ({
            ...state,
            darkTheme: !state.darkTheme,
        }));
    }
    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
                if (this.window.scrollY > 0) {
                    this.el.nativeElement.children[0].classList.add('layout-topbar-sticky');
                } else {
                    this.el.nativeElement.children[0].classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindScrollListener();
    }
}
