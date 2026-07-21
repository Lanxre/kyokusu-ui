import '../styles/accordion.css';

export interface AccordionItem {
    title: string;
    content: string | HTMLElement;
}

export interface AccordionOptions {
    items: AccordionItem[];
    multiple?: boolean;
    border?: boolean;
}

export class Accordion {
    private container: HTMLElement;
    private options: AccordionOptions;
    private openItems: Set<number> = new Set();
    private itemsEl: HTMLDivElement[] = [];
    private contentHeights: number[] = [];

    constructor(element: HTMLElement | string, options: AccordionOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Accordion not found');

        this.container = target as HTMLElement;
        this.options = {
            multiple: false,
            border: true,
            ...options
        };

        this.mount();
    }

    private mount() {
        this.container.innerHTML = '';
        this.openItems.clear();
        this.itemsEl = [];
        this.contentHeights = [];

        this.container.className = 'k-accordion';
        if (this.options.border) {
            this.container.classList.add('k-accordion--border');
        }
        this.container.setAttribute('role', 'presentation');

        this.options.items.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'k-accordion-item';

            const trigger = document.createElement('button');
            trigger.className = 'k-accordion-trigger';
            trigger.setAttribute('aria-expanded', 'false');
            trigger.setAttribute('type', 'button');

            const title = document.createElement('span');
            title.className = 'k-accordion-title';
            title.textContent = item.title;

            const icon = document.createElement('span');
            icon.className = 'k-accordion-icon';
            icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" fill="currentColor"/></svg>`;

            trigger.appendChild(title);
            trigger.appendChild(icon);

            const content = document.createElement('div');
            content.className = 'k-accordion-content';
            content.setAttribute('role', 'region');
            content.style.maxHeight = '0px';

            const body = document.createElement('div');
            body.className = 'k-accordion-body';
            if (typeof item.content === 'string') {
                body.innerHTML = item.content;
            } else {
                body.appendChild(item.content);
            }

            content.appendChild(body);

            itemEl.appendChild(trigger);
            itemEl.appendChild(content);
            this.container.appendChild(itemEl);

            this.itemsEl.push(itemEl);
            this.contentHeights.push(0);

            trigger.addEventListener('click', () => this.toggle(index));

            requestAnimationFrame(() => {
                this.contentHeights[index] = body.scrollHeight;
            });
        });
    }

    private toggle(index: number) {
        const isOpen = this.openItems.has(index);

        if (isOpen) {
            this.openItems.delete(index);
        } else {
            if (!this.options.multiple) {
                this.openItems.clear();
            }
            this.openItems.add(index);
        }

        this.updateState();
    }

    private updateState() {
        this.itemsEl.forEach((itemEl, index) => {
            const isOpen = this.openItems.has(index);
            const trigger = itemEl.querySelector('.k-accordion-trigger') as HTMLButtonElement;
            const content = itemEl.querySelector('.k-accordion-content') as HTMLDivElement;

            if (isOpen) {
                itemEl.classList.add('k-accordion-item--open');
                trigger.setAttribute('aria-expanded', 'true');
                content.style.maxHeight = `${this.contentHeights[index]}px`;
            } else {
                itemEl.classList.remove('k-accordion-item--open');
                trigger.setAttribute('aria-expanded', 'false');
                content.style.maxHeight = '0px';
            }
        });
    }

    public updateOptions(newOptions: Partial<AccordionOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public unmount() {
        this.container.innerHTML = '';
    }
}
