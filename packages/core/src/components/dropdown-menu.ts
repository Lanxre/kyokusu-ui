import '../styles/dropdown-menu.css';

export interface DropdownMenuItem {
    id: string;
    label: string;
    icon?: string | HTMLElement;
    action?: () => void;
    disabled?: boolean;
    separator?: boolean;
    submenu?: DropdownMenuItem[];
}

export interface DropdownMenuOptions {
    items: DropdownMenuItem[];
    trigger?: 'click' | 'hover';
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
    width?: number;
    offset?: number;
    onSelect?: (item: DropdownMenuItem) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

export class DropdownMenu {
    private container: HTMLElement;
    private options: DropdownMenuOptions;
    private triggerEl!: HTMLElement;
    private menuEl!: HTMLElement;
    private isOpen = false;
    private openSubmenuCount = 0;
    private hoverTimeouts: ReturnType<typeof setTimeout>[] = [];
    private boundHandlers: Array<[EventTarget, string, EventListenerOrEventListenerObject, AddEventListenerOptions?]> = [];

    constructor(element: HTMLElement | string, options: DropdownMenuOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for DropdownMenu not found');

        this.container = target as HTMLElement;
        this.options = {
            trigger: 'click',
            placement: 'bottom-start',
            width: 200,
            offset: 8,
            ...options
        };

        this.mount();
    }

    private bind(target: EventTarget, event: string, handler: EventListenerOrEventListenerObject, options?: AddEventListenerOptions) {
        target.addEventListener(event, handler, options);
        this.boundHandlers.push([target, event, handler, options]);
    }

    private mount() {
        this.triggerEl = this.container;

        this.menuEl = this.createMenu(this.options.items);
        document.body.appendChild(this.menuEl);

        this.bindEvents();
    }

    private createMenu(items: DropdownMenuItem[]): HTMLElement {
        const ul = document.createElement('ul');
        ul.className = 'k-dropdown-menu';
        ul.style.width = `${this.options.width}px`;
        ul.style.display = 'none';

        items.forEach(item => {
            if (item.separator) {
                const sep = document.createElement('li');
                sep.className = 'k-dropdown-separator';
                ul.appendChild(sep);
                return;
            }

            const li = document.createElement('li');
            li.className = 'k-dropdown-item';
            if (item.disabled) li.classList.add('k-dropdown-item--disabled');
            if (item.submenu && item.submenu.length > 0) li.classList.add('k-dropdown-item--has-submenu');

            if (item.icon) {
                const iconWrap = document.createElement('span');
                iconWrap.className = 'k-dropdown-item-icon';
                if (typeof item.icon === 'string') {
                    iconWrap.innerHTML = item.icon;
                } else {
                    iconWrap.appendChild(item.icon);
                }
                li.appendChild(iconWrap);
            }

            const label = document.createElement('span');
            label.className = 'k-dropdown-item-label';
            label.textContent = item.label;
            li.appendChild(label);

            if (item.submenu && item.submenu.length > 0) {
                const arrow = document.createElement('span');
                arrow.className = 'k-dropdown-item-arrow';
                arrow.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
                li.appendChild(arrow);

                const subMenu = this.createMenu(item.submenu);
                subMenu.classList.add('k-dropdown-submenu');
                document.body.appendChild(subMenu);

                this.bind(li, 'mouseenter', () => {
                    this.clearHoverTimeout(li);
                    if (item.disabled) return;
                    this.openSubmenuCount++;
                    subMenu.style.display = 'block';
                    this.positionSubmenu(li, subMenu);
                });

                this.bind(li, 'mouseleave', () => {
                    this.scheduleSubmenuClose(subMenu, li);
                });

                this.bind(subMenu, 'mouseenter', () => {
                    this.clearHoverTimeout(li);
                });

                this.bind(subMenu, 'mouseleave', () => {
                    this.scheduleSubmenuClose(subMenu, li);
                });
            } else {
                this.bind(li, 'click', (e: Event) => {
                    e.stopPropagation();
                    if (item.disabled) return;
                    item.action?.();
                    this.options.onSelect?.(item);
                    this.close();
                });
            }

            ul.appendChild(li);
        });

        return ul;
    }

    private clearHoverTimeout(li: HTMLElement) {
        const timeoutId = (li as any).__hoverTimeout;
        if (timeoutId) {
            clearTimeout(timeoutId);
            delete (li as any).__hoverTimeout;
        }
    }

    private scheduleSubmenuClose(subMenu: HTMLElement, li: HTMLElement) {
        const timeoutId = setTimeout(() => {
            this.openSubmenuCount = Math.max(0, this.openSubmenuCount - 1);
            subMenu.style.display = 'none';
        }, 150);
        (li as any).__hoverTimeout = timeoutId;
    }

    private bindEvents() {
        if (this.options.trigger === 'click') {
            this.bind(this.triggerEl, 'click', (e: Event) => {
                e.stopPropagation();
                this.toggle();
            });

            this.bind(document, 'click', (e: Event) => {
                const target = e.target as HTMLElement;
                if (!this.container.contains(target) && !this.menuEl.contains(target) && !target.closest('.k-dropdown-menu')) {
                    this.close();
                }
            });
        } else if (this.options.trigger === 'hover') {
            this.bind(this.triggerEl, 'mouseenter', () => this.open());
            this.bind(this.triggerEl, 'mouseleave', () => {
                const timeout = setTimeout(() => this.close(), 150);
                this.hoverTimeouts.push(timeout);
            });

            this.bind(this.menuEl, 'mouseenter', () => {
                this.hoverTimeouts.forEach(t => clearTimeout(t));
                this.hoverTimeouts = [];
            });

            this.bind(this.menuEl, 'mouseleave', () => {
                if (this.openSubmenuCount > 0) return;
                const timeout = setTimeout(() => this.close(), 150);
                this.hoverTimeouts.push(timeout);
            });
        }

        this.bind(document, 'keydown', (e: Event) => {
            if ((e as KeyboardEvent).key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        this.bind(document, 'wheel', (e: Event) => {
            if (!this.isOpen) return;
            const target = e.target as HTMLElement;
            if (!target.closest?.('.k-dropdown-menu')) {
                e.preventDefault();
            }
        }, { passive: false });

        this.bind(document, 'touchmove', (e: Event) => {
            if (!this.isOpen) return;
            const target = e.target as HTMLElement;
            if (!target.closest?.('.k-dropdown-menu')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    private positionMenu() {
        const triggerRect = this.triggerEl.getBoundingClientRect();
        const offset = this.options.offset || 8;
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        let top = 0;
        let left = 0;

        switch (this.options.placement) {
            case 'bottom-start':
                top = triggerRect.bottom + offset + scrollY;
                left = triggerRect.left + scrollX;
                break;
            case 'bottom-end':
                top = triggerRect.bottom + offset + scrollY;
                left = triggerRect.right - this.menuEl.offsetWidth + scrollX;
                break;
            case 'top-start':
                top = triggerRect.top - this.menuEl.offsetHeight - offset + scrollY;
                left = triggerRect.left + scrollX;
                break;
            case 'top-end':
                top = triggerRect.top - this.menuEl.offsetHeight - offset + scrollY;
                left = triggerRect.right - this.menuEl.offsetWidth + scrollX;
                break;
        }

        this.menuEl.style.position = 'absolute';
        this.menuEl.style.top = `${top}px`;
        this.menuEl.style.left = `${left}px`;
    }

    private positionSubmenu(li: HTMLElement, subMenu: HTMLElement) {
        const parentMenu = li.closest('.k-dropdown-menu') as HTMLElement;
        if (!parentMenu) return;

        const parentRect = parentMenu.getBoundingClientRect();
        const itemRect = li.getBoundingClientRect();
        const scrollY = window.scrollY;
        const scrollX = window.scrollX;

        subMenu.style.position = 'absolute';
        subMenu.style.top = `${itemRect.top + scrollY}px`;
        subMenu.style.left = `${parentRect.right + 1 + scrollX}px`;
    }

    private closeAllSubmenus() {
        const submenus = document.querySelectorAll('.k-dropdown-submenu');
        submenus.forEach(sub => {
            (sub as HTMLElement).style.display = 'none';
        });
        this.openSubmenuCount = 0;
    }

    public open() {
        if (this.isOpen) return;
        this.isOpen = true;
        this.menuEl.style.display = 'block';
        this.positionMenu();
        this.options.onOpen?.();
    }

    public close() {
        if (!this.isOpen) return;
        this.isOpen = false;
        this.closeAllSubmenus();
        this.menuEl.style.display = 'none';
        this.hoverTimeouts.forEach(t => clearTimeout(t));
        this.hoverTimeouts = [];
        this.options.onClose?.();
    }

    public toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    public updateOptions(newOptions: Partial<DropdownMenuOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.destroy();
        this.mount();
    }

    public destroy() {
        this.close();
        this.menuEl.remove();

        this.boundHandlers.forEach(([target, event, handler, options]) => {
            target.removeEventListener(event, handler, options);
        });
        this.boundHandlers = [];

        this.hoverTimeouts.forEach(t => clearTimeout(t));
        this.hoverTimeouts = [];
    }
}
