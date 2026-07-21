import '../styles/badge.css';

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeOptions {
    text?: string;
    variant?: BadgeVariant;
    size?: BadgeSize;
    bg?: string;
    icon?: string | HTMLElement;
    iconEnd?: string | HTMLElement;
    link?: string;
}

export class Badge {
    private container: HTMLElement;
    private options: BadgeOptions;
    private element!: HTMLElement;

    constructor(element: HTMLElement | string, options: BadgeOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Badge not found');

        this.container = target as HTMLElement;
        this.options = {
            variant: 'default',
            size: 'md',
            ...options
        };

        this.mount();
    }

    private mount() {
        this.container.innerHTML = '';

        this.element = document.createElement(this.options.link ? 'a' : 'span');
        this.element.className = 'k-badge';

        if (this.options.variant && this.options.variant !== 'default') {
            this.element.classList.add(`k-badge--${this.options.variant}`);
        }

        if (this.options.size) {
            this.element.classList.add(`k-badge--${this.options.size}`);
        }

        if (this.options.bg) {
            this.element.style.backgroundColor = this.options.bg;
        }

        if (this.options.link) {
            (this.element as HTMLAnchorElement).href = this.options.link;
            (this.element as HTMLAnchorElement).target = '_blank';
            (this.element as HTMLAnchorElement).rel = 'noopener noreferrer';
            this.element.classList.add('k-badge--link');
        }

        if (this.options.icon) {
            const iconEl = this.createIcon(this.options.icon, 'k-badge-icon--start');
            this.element.appendChild(iconEl);
        }

        const textEl = document.createElement('span');
        textEl.className = 'k-badge-text';
        textEl.textContent = this.options.text || '';
        this.element.appendChild(textEl);

        if (this.options.iconEnd) {
            const iconEl = this.createIcon(this.options.iconEnd, 'k-badge-icon--end');
            this.element.appendChild(iconEl);
        }

        this.container.appendChild(this.element);
    }

    private createIcon(icon: string | HTMLElement, positionClass: string): HTMLElement {
        const wrapper = document.createElement('span');
        wrapper.className = `k-badge-icon ${positionClass}`;

        if (typeof icon === 'string') {
            wrapper.innerHTML = icon;
        } else {
            wrapper.appendChild(icon);
        }

        return wrapper;
    }

    public setText(text: string) {
        this.options.text = text;
        const textEl = this.element.querySelector('.k-badge-text');
        if (textEl) textEl.textContent = text;
    }

    public updateOptions(newOptions: Partial<BadgeOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public getElement() {
        return this.element;
    }

    public unmount() {
        this.container.innerHTML = '';
    }
}
