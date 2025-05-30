import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import Nora from '@primeng/themes/nora';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import Material from '@primeng/themes/material';
import { SelectButton } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppState } from '@/src/app/shared/models/config.models';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LayoutService } from '@/src/app/core/services/layout.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';

const presets = {
    Aura,
    Material,
    Lara,
    Nora,
};

@Component({
    selector: 'app-configurator',
    standalone: true,
    template: `
        <div class="config-panel-content">
            <div class="config-panel-colors">
                <span class="config-panel-label">Primary</span>
                <div>
                    @for (primaryColor of primaryColors(); track primaryColor.name) {
                    <button
                        type="button"
                        [title]="primaryColor.name"
                        (click)="updateColors($event, 'primary', primaryColor)"
                        [ngClass]="{ 'active-color': primaryColor.name === selectedPrimaryColor() }"
                        [style]="{
              'background-color':
                primaryColor.name === 'noir'
                  ? 'var(--text-color)'
                  : primaryColor?.palette?.['500']
            }"></button>
                    }
                </div>
            </div>

            <div class="config-panel-colors">
                <span class="config-panel-label">Surface</span>
                <div>
                    @for (surface of layoutService.surfaces; track surface.name) {
                    <button
                        type="button"
                        [title]="surface.name"
                        (click)="updateColors($event, 'surface', surface)"
                        [ngClass]="{
                            'active-color': selectedSurfaceColor()
                                ? selectedSurfaceColor() === surface.name
                                : layoutService.appState().darkTheme
                                ? surface.name === 'zinc'
                                : surface.name === 'slate'
                        }"
                        [style]="{
              'background-color':
                surface.name === 'noir'
                  ? 'var(--text-color)'
                  : surface?.palette?.['500'] ?? ''
            }"></button>
                    }
                </div>
            </div>

            <div class="config-panel-settings">
                <span class="config-panel-label">Presets</span>
                <p-selectbutton
                    [options]="presets"
                    [ngModel]="selectedPreset()"
                    (ngModelChange)="layoutService.onPresetChange($event)"
                    [allowEmpty]="false"
                    size="small" />
            </div>
        </div>
    `,
    host: {
        class: 'config-panel hidden',
    },
    imports: [
        CommonModule,
        FormsModule,
        InputSwitchModule,
        ButtonModule,
        RadioButtonModule,
        SelectButton,
        ToggleSwitchModule,
    ],
})
export class AppConfiguratorComponent {
    platformId = inject(PLATFORM_ID);

    presets = Object.keys(presets);

    appState = computed(() => this.layoutService.appState());

    selectedPreset = computed(() => this.layoutService.appState().preset);

    selectedSurfaceColor = computed(() => this.layoutService.appState().surface);

    primaryColors = computed(() => this.layoutService.primaryColors());

    selectedPrimaryColor = computed(() => {
        return this.layoutService.appState().primary;
    });

    constructor(public layoutService: LayoutService) {
        if (isPlatformBrowser(this.platformId)) {
            this.layoutService.onPresetChange(this.layoutService.appState().preset ?? 'Aura');
        }
    }

    updateAppStateProperty<K extends keyof AppState>(property: K, value: AppState[K]) {
        const state = this.appState();
        state[property] = value;
        this.layoutService.appState.set({ ...state });
    }

    updateColors(event: any, type: string, color: any) {
        if (type === 'primary') {
            this.layoutService.appState.update(state => ({
                ...state,
                primary: color.name,
            }));
        } else if (type === 'surface') {
            this.layoutService.appState.update(state => ({
                ...state,
                surface: color.name,
            }));
        }
        this.layoutService.applyTheme(type, color);

        event.stopPropagation();
    }
}
