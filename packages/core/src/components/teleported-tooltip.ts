import '../styles/tooltip.css';

export interface TeleportedTooltipOptions {
	text: string;
	position?: 'top' | 'bottom' | 'left' | 'right';
	delay?: number;
}

export class TeleportedTooltip {
	private container: HTMLElement;
	private options: Required<TeleportedTooltipOptions>;

	private visible = false;
	private contentEl: HTMLDivElement | null = null;
	private timeout: ReturnType<typeof setTimeout> | null = null;

	private readonly GAP = 8;

	private readonly onMouseEnter = () => this.show();
	private readonly onMouseLeave = () => this.hide();
	private readonly onScrollOrResize = () => this.reposition();

	constructor(element: HTMLElement | string, options: TeleportedTooltipOptions) {
		const target = typeof element === 'string' ? document.querySelector(element) : element;
		if (!target) throw new Error('[Kyokusu UI] Target element for TeleportedTooltip not found');

		this.container = target as HTMLElement;
		this.options = {
			position: 'top',
			delay: 200,
			...options,
		};

		this.mount();
	}

	private mount(): void {
		this.container.classList.add('k-ttip-wrapper');
		this.container.addEventListener('mouseenter', this.onMouseEnter);
		this.container.addEventListener('mouseleave', this.onMouseLeave);
	}

	private buildContent(): void {
		if (this.contentEl) return;

		this.contentEl = document.createElement('div');
		this.contentEl.className = 'k-ttip-content';

		const box = document.createElement('div');
		box.className = 'k-ttip-box';
		box.textContent = this.options.text;

		const arrow = document.createElement('div');
		arrow.className = `k-ttip-arrow k-ttip-arrow--${this.options.position}`;

		box.appendChild(arrow);
		this.contentEl.appendChild(box);
		document.body.appendChild(this.contentEl);

		this.reposition();

		requestAnimationFrame(() => {
			if (this.contentEl) {
				this.contentEl.classList.add('k-ttip-visible');
			}
		});

		window.addEventListener('scroll', this.onScrollOrResize, { capture: true });
		window.addEventListener('resize', this.onScrollOrResize);
	}

	private removeContent(): void {
		if (this.contentEl) {
			this.contentEl.classList.remove('k-ttip-visible');
			const el = this.contentEl;
			this.contentEl = null;

			setTimeout(() => {
				if (el.parentNode) el.parentNode.removeChild(el);
			}, 150);

			window.removeEventListener('scroll', this.onScrollOrResize, { capture: true });
			window.removeEventListener('resize', this.onScrollOrResize);
		}
	}

	private reposition(): void {
		if (!this.contentEl || !this.visible) return;

		const r = this.container.getBoundingClientRect();
		const s = this.contentEl.style;

		switch (this.options.position) {
			case 'top':
				s.left = `${r.left + r.width / 2}px`;
				s.top = `${r.top - this.GAP}px`;
				s.transform = 'translate(-50%, -100%)';
				break;
			case 'bottom':
				s.left = `${r.left + r.width / 2}px`;
				s.top = `${r.bottom + this.GAP}px`;
				s.transform = 'translateX(-50%)';
				break;
			case 'left':
				s.top = `${r.top + r.height / 2}px`;
				s.left = `${r.left - this.GAP}px`;
				s.transform = 'translate(-100%, -50%)';
				break;
			case 'right':
				s.top = `${r.top + r.height / 2}px`;
				s.left = `${r.right + this.GAP}px`;
				s.transform = 'translateY(-50%)';
				break;
		}
	}

	public show(): void {
		if (this.timeout) clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.visible = true;
			this.buildContent();
		}, this.options.delay);
	}

	public hide(): void {
		if (this.timeout) clearTimeout(this.timeout);
		this.visible = false;
		this.removeContent();
	}

	public updateOptions(newOptions: Partial<TeleportedTooltipOptions>): void {
		this.options = { ...this.options, ...newOptions };
		if (this.visible) {
			this.hide();
		}
	}

	public unmount(): void {
		this.hide();
		this.container.classList.remove('k-ttip-wrapper');
		this.container.removeEventListener('mouseenter', this.onMouseEnter);
		this.container.removeEventListener('mouseleave', this.onMouseLeave);
	}
}
