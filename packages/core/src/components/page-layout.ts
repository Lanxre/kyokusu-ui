import '../styles/page-layout.css';

export interface PageLayoutOptions {
    maxWidth?: string;
}

export class PageLayout {
    private element: HTMLElement;
    private inner: HTMLElement;
    private options: PageLayoutOptions;

    constructor(element: HTMLElement | string, options: PageLayoutOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for PageLayout not found');

        this.element = target as HTMLElement;
        this.options = options;

        this.element.classList.add('k-page-layout');
        
        this.inner = document.createElement('div');
        this.inner.className = 'k-page-layout-inner';
        if (this.options.maxWidth) {
            this.inner.style.maxWidth = this.options.maxWidth;
        }

        while (this.element.firstChild) {
            this.inner.appendChild(this.element.firstChild);
        }

        this.element.appendChild(this.inner);
    }

    public unmount() {
        this.element.classList.remove('k-page-layout');
        if (this.inner.parentNode === this.element) {
            while (this.inner.firstChild) {
                this.element.appendChild(this.inner.firstChild);
            }
            this.element.removeChild(this.inner);
        }
    }
}
