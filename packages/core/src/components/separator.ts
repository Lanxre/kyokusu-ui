import '../styles/separator.css';

export interface SeparatorOptions {
    orientation?: 'horizontal' | 'vertical';
    label?: string;
    labelPosition?: 'left' | 'center' | 'right';
    dashed?: boolean;
}

export class Separator {
    private container: HTMLElement;
    private options: SeparatorOptions;
    private wrapperEl!: HTMLDivElement;
    private labelEl?: HTMLSpanElement;

    constructor(element: HTMLElement | string, options: SeparatorOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Separator not found');

        this.container = target as HTMLElement;
        this.options = { 
            orientation: 'horizontal',
            labelPosition: 'center',
            dashed: false,
            ...options 
        };

        this.mount();
    }

    private mount() {
        this.container.innerHTML = '';
        
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'k-separator';
        this.wrapperEl.setAttribute('role', 'separator');
        this.wrapperEl.setAttribute('aria-orientation', this.options.orientation!);

        this.wrapperEl.classList.add(`k-separator--${this.options.orientation}`);
        this.wrapperEl.classList.add(`k-separator--label-${this.options.labelPosition}`);

        if (this.options.label) {
            this.wrapperEl.classList.add('k-separator--has-label');
            if (this.options.orientation === 'horizontal') {
                this.labelEl = document.createElement('span');
                this.labelEl.className = 'k-separator-label';
                this.labelEl.textContent = this.options.label;
                this.wrapperEl.appendChild(this.labelEl);
            }
        }

        if (this.options.dashed) {
            this.wrapperEl.classList.add('k-separator--dashed');
        }

        this.container.appendChild(this.wrapperEl);
    }

    public updateOptions(newOptions: Partial<SeparatorOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public unmount() {
        this.container.innerHTML = '';
    }
}
