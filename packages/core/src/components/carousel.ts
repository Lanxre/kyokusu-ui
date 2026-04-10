import '../styles/carousel.css';

export interface CarouselOptions {
    items: (string | HTMLElement)[];
    interval?: number; // seconds
}

export class Carousel {
    private container: HTMLElement;
    private options: CarouselOptions;
    
    private wrapperEl!: HTMLDivElement;
    private containerEl!: HTMLDivElement;

    private isDown = false;
    private startX = 0;
    private scrollLeft = 0;
    private autoPlayInterval: ReturnType<typeof setInterval> | null = null;
    
    private readonly resizeHandler = this.alignToCenter.bind(this);

    constructor(element: HTMLElement | string, options: CarouselOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Carousel not found');

        this.container = target as HTMLElement;
        this.options = { interval: 5, ...options };
        
        this.mount();
    }

    private createEl<K extends keyof HTMLElementTagNameMap>(
        tag: K, 
        className: string
    ): HTMLElementTagNameMap[K] {
        const el = document.createElement(tag);
        el.className = className;
        return el;
    }

    private mount() {
        this.container.innerHTML = '';
        
        this.wrapperEl = this.createEl('div', 'k-carousel-wrapper');
        this.containerEl = this.createEl('div', 'k-carousel-container');

        this.options.items.forEach(item => {
            const itemEl = this.createEl('div', 'k-carousel-item');
            if (typeof item === 'string') {
                itemEl.innerHTML = item;
            } else {
                itemEl.appendChild(item);
            }
            this.containerEl.appendChild(itemEl);
        });

        // Event Listeners
        this.containerEl.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.containerEl.addEventListener('mouseleave', () => this.onMouseLeaveOrUp());
        this.containerEl.addEventListener('mouseup', () => this.onMouseLeaveOrUp());
        this.containerEl.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.containerEl.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.containerEl.addEventListener('touchstart', () => this.stopAutoPlay(), { passive: true });

        this.wrapperEl.appendChild(this.containerEl);
        this.container.appendChild(this.wrapperEl);

        // Init logic
        requestAnimationFrame(() => {
            this.alignToCenter();
            window.addEventListener('resize', this.resizeHandler);
            this.startAutoPlay();
        });
    }

    private alignToCenter() {
        const firstCard = this.containerEl.firstElementChild as HTMLElement;
        if (firstCard) {
            const padding = 0; // Let CSS flex gap handle spacing
            this.containerEl.style.paddingLeft = `${padding}px`;
            this.containerEl.style.paddingRight = `${padding}px`;
        }
    }

    private nextSlide() {
        const cardWidth = this.containerEl.children[0]?.clientWidth || 220;
        const gap = 16;

        if (this.containerEl.scrollLeft + this.containerEl.clientWidth >= this.containerEl.scrollWidth - 10) {
            this.containerEl.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            this.containerEl.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
        }
    }

    private startAutoPlay() {
        this.stopAutoPlay();
        if (this.options.interval && this.options.interval > 0) {
            this.autoPlayInterval = setInterval(() => this.nextSlide(), this.options.interval * 1000);
        }
    }

    private stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    private onMouseDown(e: MouseEvent) {
        this.isDown = true;
        this.stopAutoPlay();
        this.startX = e.pageX - this.containerEl.offsetLeft;
        this.scrollLeft = this.containerEl.scrollLeft;

        this.containerEl.style.scrollBehavior = 'auto';
        this.containerEl.style.scrollSnapType = 'none';
        this.containerEl.style.cursor = 'grabbing';
    }

    private onMouseLeaveOrUp() {
        if (!this.isDown) return;
        this.isDown = false;
        this.startAutoPlay();
        
        this.containerEl.style.scrollBehavior = 'smooth';
        this.containerEl.style.scrollSnapType = 'x mandatory';
        this.containerEl.style.cursor = 'grab';
    }

    private onMouseMove(e: MouseEvent) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.containerEl.offsetLeft;
        const walk = (x - this.startX) * 1.5;
        this.containerEl.scrollLeft = this.scrollLeft - walk;
    }

    public updateOptions(newOptions: Partial<CarouselOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.stopAutoPlay();
        this.mount();
    }

    public unmount() {
        this.stopAutoPlay();
        window.removeEventListener('resize', this.resizeHandler);
        this.container.innerHTML = '';
    }
}