import '../styles/popover.css';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
export type PopoverTrigger = 'click' | 'hover';

export interface PopoverOptions {
    placement?: PopoverPlacement;
    trigger?: PopoverTrigger;
    title?: string;
    content?: string | HTMLElement;
    width?: number;
    offset?: number;
}

export class Popover {
    private container: HTMLElement;
    private options: PopoverOptions;
    private triggerEl!: HTMLElement;
    private popoverEl!: HTMLElement;
    private arrowEl!: HTMLElement;
    private isOpen = false;

    constructor(element: HTMLElement | string, options: PopoverOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Popover not found');

        this.container = target as HTMLElement;
        this.options = {
            placement: 'bottom',
            trigger: 'click',
            width: 200,
            offset: 8,
            ...options
        };

        this.mount();
    }

    private mount() {
        this.container.innerHTML = '';
        this.container.style.position = 'relative';
        this.container.style.display = 'inline-block';

        this.triggerEl = document.createElement('div');
        this.triggerEl.className = 'k-popover-trigger';
        this.triggerEl.innerHTML = this.container.innerHTML;
        this.container.innerHTML = '';
        this.container.appendChild(this.triggerEl);

        this.createPopover();
        this.bindEvents();
    }

    private createPopover() {
        this.popoverEl = document.createElement('div');
        this.popoverEl.className = `k-popover k-popover--${this.options.placement}`;
        this.popoverEl.style.width = `${this.options.width}px`;
        this.popoverEl.setAttribute('role', 'dialog');
        this.popoverEl.style.display = 'none';

        this.arrowEl = document.createElement('div');
        this.arrowEl.className = 'k-popover-arrow';
        this.popoverEl.appendChild(this.arrowEl);

        if (this.options.title) {
            const titleEl = document.createElement('div');
            titleEl.className = 'k-popover-title';
            titleEl.textContent = this.options.title;
            this.popoverEl.appendChild(titleEl);
        }

        const contentEl = document.createElement('div');
        contentEl.className = 'k-popover-content';
        if (typeof this.options.content === 'string') {
            contentEl.innerHTML = this.options.content;
        } else if (this.options.content) {
            contentEl.appendChild(this.options.content);
        }
        this.popoverEl.appendChild(contentEl);

        document.body.appendChild(this.popoverEl);
    }

    private bindEvents() {
        if (this.options.trigger === 'click') {
            this.triggerEl.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggle();
            });
            document.addEventListener('click', (e) => {
                if (!this.container.contains(e.target as Node) && 
                    !this.popoverEl.contains(e.target as Node)) {
                    this.hide();
                }
            });
        } else if (this.options.trigger === 'hover') {
            this.triggerEl.addEventListener('mouseenter', () => this.show());
            this.triggerEl.addEventListener('mouseleave', () => this.hide());
            this.popoverEl.addEventListener('mouseenter', () => this.show());
            this.popoverEl.addEventListener('mouseleave', () => this.hide());
        }
    }

    private updatePosition() {
        const triggerRect = this.triggerEl.getBoundingClientRect();
        const offset = this.options.offset || 8;

        let top = 0;
        let left = 0;

        switch (this.options.placement) {
            case 'bottom':
                top = triggerRect.bottom + offset + window.scrollY;
                left = triggerRect.left + triggerRect.width / 2 - this.popoverEl.offsetWidth / 2 + window.scrollX;
                break;
            case 'top':
                top = triggerRect.top - this.popoverEl.offsetHeight - offset + window.scrollY;
                left = triggerRect.left + triggerRect.width / 2 - this.popoverEl.offsetWidth / 2 + window.scrollX;
                break;
            case 'left':
                top = triggerRect.top + triggerRect.height / 2 - this.popoverEl.offsetHeight / 2 + window.scrollY;
                left = triggerRect.left - this.popoverEl.offsetWidth - offset + window.scrollX;
                break;
            case 'right':
                top = triggerRect.top + triggerRect.height / 2 - this.popoverEl.offsetHeight / 2 + window.scrollY;
                left = triggerRect.right + offset + window.scrollX;
                break;
        }

        this.popoverEl.style.position = 'absolute';
        this.popoverEl.style.top = `${top}px`;
        this.popoverEl.style.left = `${left}px`;
    }

    public toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    public show() {
        this.popoverEl.style.display = 'block';
        this.isOpen = true;
        this.updatePosition();
    }

    public hide() {
        this.popoverEl.style.display = 'none';
        this.isOpen = false;
    }

    public updateOptions(newOptions: Partial<PopoverOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public unmount() {
        this.popoverEl.remove();
        this.container.innerHTML = '';
    }
}
