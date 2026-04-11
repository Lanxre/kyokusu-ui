import '../styles/card.css';

export type CardVariant = 'default' | 'outline' | 'ghost';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardOptions {
    variant?: CardVariant;
    padding?: CardPadding;
    shadow?: boolean;
}

export class Card {
    private element: HTMLDivElement;
    private options: CardOptions;

    constructor(element: HTMLDivElement | string, options: CardOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) {
            this.element = document.createElement('div');
        } else {
            this.element = target as HTMLDivElement;
        }

        this.options = {
            variant: 'default',
            padding: 'md',
            shadow: false,
            ...options
        };

        this.mount();
    }

    private mount() {
        this.updateClasses();
    }

    private updateClasses() {
        this.element.className = 'k-card';
        
        if (this.options.variant && this.options.variant !== 'default') {
            this.element.classList.add(`k-card--${this.options.variant}`);
        }
        
        if (this.options.padding) {
            this.element.classList.add(`k-card--padding-${this.options.padding}`);
        }
        
        if (this.options.shadow) {
            this.element.classList.add('k-card--shadow');
        }
    }

    public updateOptions(newOptions: Partial<CardOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.updateClasses();
    }

    public getElement() {
        return this.element;
    }

    public unmount() {
        this.element.className = '';
    }
}
