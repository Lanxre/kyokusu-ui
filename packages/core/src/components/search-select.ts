import '../styles/search-select.css';

export interface SearchSelectOption {
    id: string | number;
    label: string;
}

export interface SearchSelectOptions {
    value?: string | number | null;
    id?: string;
    label?: string;
    placeholder?: string;
    options: (string | SearchSelectOption)[];
    disabled?: boolean;
    error?: string;
    onChange?: (value: string | number) => void;
}

const ICONS = {
    chevronDown: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>`,
    search: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`
};

export class SearchSelect {
    private container: HTMLElement;
    private options: SearchSelectOptions;
    
    private value: string | number | null = null;
    private isOpen = false;
    private searchQuery = '';
    private normalizedOptions: SearchSelectOption[] = [];

    private wrapperEl!: HTMLDivElement;
    private triggerEl!: HTMLDivElement;
    private popupEl?: HTMLDivElement;
    private listEl?: HTMLUListElement;
    private searchInputEl?: HTMLInputElement;
    private valueEl!: HTMLSpanElement;

    private documentClickHandler: (e: MouseEvent) => void;

    constructor(element: HTMLElement | string, options: SearchSelectOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for SearchSelect not found');

        this.container = target as HTMLElement;
        this.options = { placeholder: 'Выберите из списка', ...options };
        this.value = options.value ?? null;
        
        this.normalizeOptions();
        this.documentClickHandler = this.handleClickOutside.bind(this);
        
        this.mount();
        document.addEventListener('mousedown', this.documentClickHandler);
    }

    private normalizeOptions() {
        this.normalizedOptions = this.options.options.map(opt => 
            typeof opt === 'string' ? { id: opt, label: opt } : opt
        );
    }

    private get currentLabel() {
        const found = this.normalizedOptions.find(opt => opt.id === this.value);
        return found ? found.label : '';
    }

    private get filteredOptions() {
        if (!this.searchQuery) return this.normalizedOptions;
        const q = this.searchQuery.toLowerCase();
        return this.normalizedOptions.filter(opt => opt.label.toLowerCase().includes(q));
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
        this.container.innerHTML = '';
        this.wrapperEl = this.createEl('div', 'k-searchselect-wrapper');

        if (this.options.label) {
            const id = this.options.id || `k-sselect-${Math.random().toString(36).slice(2, 9)}`;
            this.options.id = id;
            this.wrapperEl.appendChild(this.createEl('label', 'k-searchselect-label', {
                htmlFor: id, textContent: this.options.label
            }));
        }

        const triggerContainer = this.createEl('div', 'k-searchselect-trigger-container');
        
        this.triggerEl = this.createEl('div', 'k-searchselect-trigger');
        if (this.options.disabled) this.triggerEl.classList.add('k-searchselect-trigger--disabled');
        if (this.options.error) this.triggerEl.classList.add('k-searchselect-trigger--error');

        this.valueEl = this.createEl('span', 'k-searchselect-value');
        this.updateTriggerText();

        const iconContainer = this.createEl('div', 'k-searchselect-icon', { innerHTML: ICONS.chevronDown });

        this.triggerEl.appendChild(this.valueEl);
        this.triggerEl.appendChild(iconContainer);

        this.triggerEl.addEventListener('click', () => {
            if (this.options.disabled) return;
            this.toggleDropdown();
        });

        triggerContainer.appendChild(this.triggerEl);
        this.wrapperEl.appendChild(triggerContainer);

        if (this.options.error) {
            this.wrapperEl.appendChild(this.createEl('p', 'k-searchselect-error-text', { textContent: this.options.error }));
        }

        this.container.appendChild(this.wrapperEl);
    }

    private updateTriggerText() {
        const label = this.currentLabel;
        if (label) {
            this.valueEl.textContent = label;
            this.valueEl.classList.add('k-searchselect-value--selected');
        } else {
            this.valueEl.textContent = this.options.placeholder || '';
            this.valueEl.classList.remove('k-searchselect-value--selected');
        }
    }

    private toggleDropdown() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.triggerEl.classList.add('k-searchselect-trigger--open');
            this.searchQuery = '';
            this.renderPopup();
            // trigger reflow
            void this.popupEl?.offsetWidth;
            if (this.searchInputEl) {
                setTimeout(() => this.searchInputEl?.focus(), 10);
            }
        } else {
            this.triggerEl.classList.remove('k-searchselect-trigger--open');
            if (this.popupEl) {
                this.popupEl.style.opacity = '0';
                this.popupEl.style.transform = 'translateY(-8px)';
                setTimeout(() => {
                    if (this.popupEl && this.popupEl.parentNode) {
                        this.popupEl.parentNode.removeChild(this.popupEl);
                    }
                    this.popupEl = undefined;
                }, 200);
            }
        }
    }

    private handleClickOutside(e: MouseEvent) {
        if (this.isOpen && this.wrapperEl && !this.wrapperEl.contains(e.target as Node)) {
            this.toggleDropdown();
        }
    }

    private renderPopup() {
        if (this.popupEl && this.popupEl.parentNode) {
            this.popupEl.parentNode.removeChild(this.popupEl);
        }

        this.popupEl = this.createEl('div', 'k-searchselect-popup');
        this.popupEl.style.opacity = '0';
        this.popupEl.style.transform = 'translateY(-8px)';
        this.popupEl.style.transition = 'all 0.2s ease';

        const header = this.createEl('div', 'k-searchselect-search-header');
        const searchContainer = this.createEl('div', 'k-searchselect-search-container');
        
        this.searchInputEl = this.createEl('input', 'k-searchselect-search-input', {
            type: 'text',
            placeholder: 'Поиск...'
        });
        
        this.searchInputEl.addEventListener('click', e => e.stopPropagation());
        this.searchInputEl.addEventListener('input', (e) => {
            this.searchQuery = (e.target as HTMLInputElement).value;
            this.renderList();
        });

        const searchIcon = this.createEl('div', 'k-searchselect-search-icon', { innerHTML: ICONS.search });

        searchContainer.appendChild(this.searchInputEl);
        searchContainer.appendChild(searchIcon);
        header.appendChild(searchContainer);
        this.popupEl.appendChild(header);

        this.listEl = this.createEl('ul', 'k-searchselect-list');
        this.renderList();
        this.popupEl.appendChild(this.listEl);

        const triggerContainer = this.wrapperEl.querySelector('.k-searchselect-trigger-container');
        triggerContainer?.appendChild(this.popupEl);

        requestAnimationFrame(() => {
            if (this.popupEl) {
                this.popupEl.style.opacity = '1';
                this.popupEl.style.transform = 'translateY(0)';
            }
        });
    }

    private renderList() {
        if (!this.listEl) return;
        this.listEl.innerHTML = '';

        const items = this.filteredOptions;

        if (items.length === 0) {
            this.listEl.appendChild(this.createEl('li', 'k-searchselect-empty', { textContent: 'Ничего не найдено' }));
            return;
        }

        items.forEach(item => {
            const li = this.createEl('li', 'k-searchselect-item', { textContent: item.label });
            if (this.value === item.id) {
                li.classList.add('k-searchselect-item--selected');
                li.appendChild(this.createEl('div', 'k-searchselect-item-dot'));
            }
            
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectItem(item.id);
            });
            
            this.listEl!.appendChild(li);
        });
    }

    private selectItem(id: string | number) {
        this.value = id;
        this.updateTriggerText();
        this.toggleDropdown();
        if (this.options.onChange) {
            this.options.onChange(id);
        }
    }

    public updateOptions(newOptions: Partial<SearchSelectOptions>) {
        this.options = { ...this.options, ...newOptions };
        if (newOptions.options) {
            this.normalizeOptions();
            if (this.isOpen) this.renderList();
        }
        if (newOptions.value !== undefined) {
            this.value = newOptions.value;
            this.updateTriggerText();
        }
        if (newOptions.disabled !== undefined) {
            this.triggerEl.classList.toggle('k-searchselect-trigger--disabled', !!newOptions.disabled);
        }
        if (newOptions.error !== undefined) {
            this.triggerEl.classList.toggle('k-searchselect-trigger--error', !!newOptions.error);
        }
    }

    public unmount() {
        document.removeEventListener('mousedown', this.documentClickHandler);
        this.container.innerHTML = '';
    }
}
