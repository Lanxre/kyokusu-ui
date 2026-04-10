import '../styles/modal-window.css';

export interface ModalWindowOptions {
    title?: string;
    width?: string;
    height?: string;
    centerTitle?: boolean;
    content?: string | HTMLElement;
    footer?: string | HTMLElement;
    onClose?: () => void;
}

const CLOSE_ICON = `<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`;

export class ModalWindow {
    private options: ModalWindowOptions;
    private isOpen = false;
    
    private overlayEl?: HTMLDivElement;
    private backdropEl?: HTMLDivElement;
    private contentContainerEl?: HTMLDivElement;
    private titleEl?: HTMLHeadingElement;
    private bodyEl?: HTMLDivElement;
    private footerEl?: HTMLDivElement;

    private readonly escapeHandler = this.handleEscape.bind(this);

    constructor(options: ModalWindowOptions = {}) {
        this.options = { width: 'max-w-lg', centerTitle: false, ...options };
    }

    private createEl<K extends keyof HTMLElementTagNameMap>(
        tag: K, 
        className: string, 
        attributes: Record<string, any> = {}
    ): HTMLElementTagNameMap[K] {
        const el = document.createElement(tag);
        el.className = className;
        Object.entries(attributes).forEach(([key, val]) => {
            if (key in el) (el as any)[key] = val;
            else el.setAttribute(key, val);
        });
        return el;
    }

    private mount() {
        if (this.overlayEl) return;

        this.overlayEl = this.createEl('div', 'k-modal-overlay', { role: 'dialog', 'aria-modal': 'true' });
        
        this.backdropEl = this.createEl('div', 'k-modal-backdrop');
        this.backdropEl.addEventListener('click', () => this.close());
        
        const scrollContainer = this.createEl('div', 'k-modal-scroll-container');
        const centeringDiv = this.createEl('div', 'k-modal-centering');
        
        this.contentContainerEl = this.createEl('div', `k-modal-content ${this.options.width}`);
        this.contentContainerEl.addEventListener('click', (e) => e.stopPropagation());

        const headerClass = this.options.centerTitle ? 'k-modal-header--center' : 'k-modal-header--between';
        const headerEl = this.createEl('div', `k-modal-header ${headerClass}`);
        
        this.titleEl = this.createEl('h3', 'k-modal-title', { textContent: this.options.title || '' });
        headerEl.appendChild(this.titleEl);

        const closeClass = this.options.centerTitle ? 'k-modal-close--absolute' : 'k-modal-close--relative';
        const closeBtn = this.createEl('button', `k-modal-close ${closeClass}`, { type: 'button', innerHTML: CLOSE_ICON });
        closeBtn.addEventListener('click', () => this.close());
        headerEl.appendChild(closeBtn);

        this.bodyEl = this.createEl('div', `k-modal-body ${this.options.height || ''}`);
        if (this.options.content) {
            if (typeof this.options.content === 'string') {
                this.bodyEl.innerHTML = this.options.content;
            } else {
                this.bodyEl.appendChild(this.options.content);
            }
        }

        this.contentContainerEl.appendChild(headerEl);
        this.contentContainerEl.appendChild(this.bodyEl);

        if (this.options.footer) {
            this.footerEl = this.createEl('div', 'k-modal-footer');
            if (typeof this.options.footer === 'string') {
                this.footerEl.innerHTML = this.options.footer;
            } else {
                this.footerEl.appendChild(this.options.footer);
            }
            this.contentContainerEl.appendChild(this.footerEl);
        }

        centeringDiv.appendChild(this.contentContainerEl);
        scrollContainer.appendChild(centeringDiv);
        
        this.overlayEl.appendChild(this.backdropEl);
        this.overlayEl.appendChild(scrollContainer);

        // Pre-animate state
        this.backdropEl.style.opacity = '0';
        this.contentContainerEl.style.opacity = '0';
        this.contentContainerEl.style.transform = 'translateY(10px) scale(0.95)';

        document.body.appendChild(this.overlayEl);

        document.addEventListener('keydown', this.escapeHandler);
        document.body.style.overflow = 'hidden';

        // Trigger animations
        requestAnimationFrame(() => {
            if (this.backdropEl && this.contentContainerEl) {
                this.backdropEl.style.opacity = '1';
                this.contentContainerEl.style.opacity = '1';
                this.contentContainerEl.style.transform = 'translateY(0) scale(1)';
            }
        });
    }

    public open() {
        if (this.isOpen) return;
        this.isOpen = true;
        this.mount();
    }

    public close() {
        if (!this.isOpen || !this.overlayEl) return;
        this.isOpen = false;

        document.removeEventListener('keydown', this.escapeHandler);
        document.body.style.overflow = '';

        if (this.backdropEl && this.contentContainerEl) {
            this.backdropEl.style.opacity = '0';
            this.contentContainerEl.style.opacity = '0';
            this.contentContainerEl.style.transform = 'translateY(10px) scale(0.95)';
        }

        setTimeout(() => {
            if (this.overlayEl && this.overlayEl.parentNode) {
                this.overlayEl.parentNode.removeChild(this.overlayEl);
            }
            this.overlayEl = undefined;
            if (this.options.onClose) this.options.onClose();
        }, 300);
    }

    private handleEscape(e: KeyboardEvent) {
        if (e.key === 'Escape' && this.isOpen) {
            this.close();
        }
    }

    public updateOptions(newOptions: Partial<ModalWindowOptions>) {
        this.options = { ...this.options, ...newOptions };
        
        if (!this.isOpen) return;

        if (this.titleEl && newOptions.title !== undefined) {
            this.titleEl.textContent = newOptions.title || '';
        }

        if (this.contentContainerEl && newOptions.width !== undefined) {
            this.contentContainerEl.className = `k-modal-content ${newOptions.width}`;
        }
        
        if (this.bodyEl && newOptions.content !== undefined) {
            this.bodyEl.innerHTML = '';
            if (typeof newOptions.content === 'string') {
                this.bodyEl.innerHTML = newOptions.content;
            } else {
                this.bodyEl.appendChild(newOptions.content);
            }
        }
    }

    public destroy() {
        if (this.isOpen) this.close();
    }
}