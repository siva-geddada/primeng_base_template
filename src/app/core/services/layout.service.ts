import Nora from '@primeng/themes/nora';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';
import { PrimeNG } from 'primeng/config';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import Material from '@primeng/themes/material';
import { DEFAULT_CONFIG } from './../../shared/models/config.models';
import { updatePreset, updateSurfacePalette, $t } from '@primeng/themes';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { APP_PRESET_COLORS, APP_SURFACES, AppState } from '../../shared/models/config.models';

const presets = {
    Aura,
    Lara,
    Nora,
    Material,
};

interface Palette {
    [key: string]: string;
}

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    initialized = false;

    surfaces = APP_SURFACES;

    newsActive = signal(false);

    document = inject(DOCUMENT);

    platformId = inject(PLATFORM_ID);

    STORAGE_KEY = 'APP_STATE_CONFIGS';

    config: PrimeNG = inject(PrimeNG);

    transitionComplete = signal<boolean>(false);

    appState = signal<AppState>(DEFAULT_CONFIG);

    preset = signal({ primitive: null, semantic: null });

    theme = computed(() => (this.appState()?.darkTheme ? 'dark' : 'light'));

    setPreset(preset: any) {
        this.preset.set(preset);
    }

    primaryColors = computed(() => {
        const colors = APP_PRESET_COLORS;
        const currentPreset = this.appState().preset;
        const presetPalette: any =
            currentPreset && currentPreset in presets
                ? presets[currentPreset]?.primitive
                : null;
        const palettes = [{ name: 'noir', palette: {} as Palette }];
        colors.forEach((color: string) => {
            palettes.push({
                name: color,
                palette: presetPalette[color],
            });
        });
        return palettes;
    });

    constructor() {
        this.appState.set({ ...this.loadAppState() });
        effect(() => {
            const state = this.appState();
            if (!this.initialized || !state) {
                this.initialized = true;
                return;
            }
            this.saveAppState(state);
            this.handleDarkModeTransition(state);
        });
    }
    private loadAppState(): any {
        if (isPlatformBrowser(this.platformId)) {
            const storedState = localStorage.getItem(this.STORAGE_KEY);
            if (storedState) {
                return JSON.parse(storedState);
            }
        }
        return DEFAULT_CONFIG;
    }

    private saveAppState(state: any): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
        }
    }

    private handleDarkModeTransition(state: AppState): void {
        if (isPlatformBrowser(this.platformId)) {
            if ((document as any).startViewTransition) {
                this.startViewTransition(state);
            } else {
                this.toggleDarkMode(state);
                this.onTransitionEnd();
            }
        }
    }

    private startViewTransition(state: AppState): void {
        const transition = (document as any).startViewTransition(() => {
            this.toggleDarkMode(state);
        });
        transition.ready.then(() => this.onTransitionEnd());
    }

    private toggleDarkMode(state: AppState): void {
        if (state.darkTheme) {
            this.document.documentElement.classList.add('p-dark');
        } else {
            this.document.documentElement.classList.remove('p-dark');
        }
    }

    private onTransitionEnd() {
        this.transitionComplete.set(true);
        setTimeout(() => {
            this.transitionComplete.set(false);
        });
    }

    hideNews() {
        this.newsActive.set(false);
    }

    showNews() {
        this.newsActive.set(true);
    }

    hideMenu() {
        this.appState.update(state => ({
            ...state,
            menuActive: false,
        }));
    }

    showMenu() {
        this.appState.update(state => ({
            ...state,
            menuActive: true,
        }));
    }

    applyTheme(type: string, color: any) {
        if (type === 'primary') {
            updatePreset(this.getPresets());
        } else if (type === 'surface') {
            updateSurfacePalette(color.palette);
        }
    }

    public onPresetChange(event: keyof typeof presets) {
        this.appState.update(state => ({ ...state, preset: event }));
        const preset = presets[event];
        const surfacePalette = this.surfaces.find(s => s.name === this.appState().surface)?.palette;
        if (this.appState().preset === 'Material') {
            document.body.classList.add('material');
            this.config.ripple.set(true);
        } else {
            document.body.classList.remove('material');
            this.config.ripple.set(false);
        }
        $t()
            .preset(preset)
            .preset(this.getPresets())
            .surfacePalette(surfacePalette)
            .use({ useDefaultOptions: true });
    }

    public getColors() {
        return this.primaryColors().find(c => c.name === this.appState().primary);
    }
    private getPresets() {
        const color = this.primaryColors().find(c => c.name === this.appState().primary);
        if (color?.name === 'noir') {
            return {
                semantic: {
                    primary: {
                        50: '{surface.50}',
                        100: '{surface.100}',
                        200: '{surface.200}',
                        300: '{surface.300}',
                        400: '{surface.400}',
                        500: '{surface.500}',
                        600: '{surface.600}',
                        700: '{surface.700}',
                        800: '{surface.800}',
                        900: '{surface.900}',
                        950: '{surface.950}',
                    },
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.950}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.800}',
                                activeColor: '{primary.700}',
                            },
                            highlight: {
                                background: '{primary.950}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff',
                            },
                        },
                        dark: {
                            primary: {
                                color: '{primary.50}',
                                contrastColor: '{primary.950}',
                                hoverColor: '{primary.200}',
                                activeColor: '{primary.300}',
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.300}',
                                color: '{primary.950}',
                                focusColor: '{primary.950}',
                            },
                        },
                    },
                },
            };
        } else if (this.appState().preset === 'Nora') {
            return {
                semantic: {
                    primary: color?.palette,
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.600}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.700}',
                                activeColor: '{primary.800}',
                            },
                            highlight: {
                                background: '{primary.600}',
                                focusBackground: '{primary.700}',
                                color: '#ffffff',
                                focusColor: '#ffffff',
                            },
                        },
                        dark: {
                            primary: {
                                color: '{primary.500}',
                                contrastColor: '{surface.900}',
                                hoverColor: '{primary.400}',
                                activeColor: '{primary.300}',
                            },
                            highlight: {
                                background: '{primary.500}',
                                focusBackground: '{primary.400}',
                                color: '{surface.900}',
                                focusColor: '{surface.900}',
                            },
                        },
                    },
                },
            };
        } else if (this.appState().preset === 'Material') {
            return {
                semantic: {
                    primary: color?.palette,
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.500}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.400}',
                                activeColor: '{primary.300}',
                            },
                            highlight: {
                                background: 'color-mix(in srgb, {primary.color}, transparent 88%)',
                                focusBackground:
                                    'color-mix(in srgb, {primary.color}, transparent 76%)',
                                color: '{primary.700}',
                                focusColor: '{primary.800}',
                            },
                        },
                        dark: {
                            primary: {
                                color: '{primary.400}',
                                contrastColor: '{surface.900}',
                                hoverColor: '{primary.300}',
                                activeColor: '{primary.200}',
                            },
                            highlight: {
                                background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                focusBackground:
                                    'color-mix(in srgb, {primary.400}, transparent 76%)',
                                color: 'rgba(255,255,255,.87)',
                                focusColor: 'rgba(255,255,255,.87)',
                            },
                        },
                    },
                },
            };
        } else {
            return {
                semantic: {
                    primary: color?.palette,
                    colorScheme: {
                        light: {
                            primary: {
                                color: '{primary.500}',
                                contrastColor: '#ffffff',
                                hoverColor: '{primary.600}',
                                activeColor: '{primary.700}',
                            },
                            highlight: {
                                background: '{primary.50}',
                                focusBackground: '{primary.100}',
                                color: '{primary.700}',
                                focusColor: '{primary.800}',
                            },
                        },
                        dark: {
                            primary: {
                                color: '{primary.400}',
                                contrastColor: '{surface.900}',
                                hoverColor: '{primary.300}',
                                activeColor: '{primary.200}',
                            },
                            highlight: {
                                background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                                focusBackground:
                                    'color-mix(in srgb, {primary.400}, transparent 76%)',
                                color: 'rgba(255,255,255,.87)',
                                focusColor: 'rgba(255,255,255,.87)',
                            },
                        },
                    },
                },
            };
        }
    }
}
