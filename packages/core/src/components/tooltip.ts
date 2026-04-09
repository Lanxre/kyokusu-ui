import '../styles/tooltip.css';

export interface TooltipOptions {
    text: string;
    position?: 'top' | 'bottom' | 'left' | 'right';
    delay?: number;
}

export class Tooltip {
    private container: HTMLElement;
    private options: TooltipOptions;
    private wrapperEl!: HTMLDivElement;
    private contentEl?: HTMLDivElement;
    private timeout: ReturnType<typeof setTimeout> | null = null;

    private mouseEnterHandler = () => this.show();
    private mouseLeaveHandler = () => this.hide();

    constructor(element: HTMLElement | string, options: TooltipOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Tooltip not found');

        this.container = target as HTMLElement;
        this.options = {
            position: 'top',
            delay: 200,
            ...options
        };

        this.mount();
    }

    private mount() {
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'k-tooltip-wrapper';
        
        if (this.container.parentNode) {
            this.container.parentNode.insertBefore(this.wrapperEl, this.container);
        }
        this.wrapperEl.appendChild(this.container);

        this.wrapperEl.addEventListener('mouseenter', this.mouseEnterHandler);
        this.wrapperEl.addEventListener('mouseleave', this.mouseLeaveHandler);
    }

    public show() {
        this.timeout = setTimeout(() => {
            if (!this.contentEl) {
                this.contentEl = document.createElement('div');
                this.contentEl.className = `k-tooltip-content k-tooltip-content--${this.options.position}`;
                
                const box = document.createElement('div');
                box.className = 'k-tooltip-box';
                box.textContent = this.options.text;

                const arrow = document.createElement('div');
                arrow.className = `k-tooltip-arrow k-tooltip-arrow--${this.options.position}`;
                
                box.appendChild(arrow);
                this.contentEl.appendChild(box);
                this.wrapperEl.appendChild(this.contentEl);

                // Wait for DOM layout to apply transition correctly
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (this.contentEl) {
                            this.contentEl.classList.add('k-tooltip-visible');
                        }
                    });
                });
            }
        }, this.options.delay);
    }

    public hide() {
        if (this.timeout) clearTimeout(this.timeout);
        
        if (this.contentEl) {
            this.contentEl.classList.remove('k-tooltip-visible');
            const elToRemove = this.contentEl;
            this.contentEl = undefined;
            
            setTimeout(() => {
                if (elToRemove && elToRemove.parentNode) {
                    elToRemove.parentNode.removeChild(elToRemove);
                }
            }, 100); 
        }
    }

    public updateOptions(newOptions: Partial<TooltipOptions>) {
        this.options = { ...this.options, ...newOptions };
        if (this.contentEl) {
            this.hide();
        }
    }

    public unmount() {
        this.wrapperEl.removeEventListener('mouseenter', this.mouseEnterHandler);
        this.wrapperEl.removeEventListener('mouseleave', this.mouseLeaveHandler);
        if (this.wrapperEl.parentNode) {
            this.wrapperEl.parentNode.insertBefore(this.container, this.wrapperEl);
            this.wrapperEl.parentNode.removeChild(this.wrapperEl);
        }
    }
}
