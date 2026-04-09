import '../styles/date-picker.css';

export interface DatePickerOptions {
    value?: string;
    id?: string;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    locale?: string;
    error?: string;
    onChange?: (value: string) => void;
}

const toISODate = (d: Date): string => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const ICONS = {
    calendar: `<svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>`,
    caretLeft: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z"></path></svg>`,
    caretRight: `<svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M184.49,136.49l-80,80a12,12,0,0,1-17-17L159,128,87.51,56.49a12,12,0,1,1,17-17l80,80A12,12,0,0,1,184.49,136.49Z"></path></svg>`
};

export class DatePicker {
    private container: HTMLElement;
    private options: DatePickerOptions;
    
    private value: string = '';
    private viewDate: Date = new Date();
    private viewMode: 'days' | 'years' = 'days';
    private isOpen = false;

    private wrapperEl!: HTMLDivElement;
    private inputEl!: HTMLInputElement;
    private popupEl?: HTMLDivElement;
    private documentClickHandler: (e: MouseEvent) => void;

    constructor(element: HTMLElement | string, options: DatePickerOptions = {}) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for DatePicker not found');

        this.container = target as HTMLElement;
        this.options = { locale: 'ru-RU', ...options };
        this.value = options.value || '';
        
        this.documentClickHandler = this.handleClickOutside.bind(this);
        
        this.initDate();
        this.mount();
        document.addEventListener('click', this.documentClickHandler);
    }

    private parseDate(val?: string): Date | null {
        if (!val) return null;
        if (val.includes(".")) {
            const [d, m, y] = val.split(".");
            return new Date(Number(y), Number(m) - 1, Number(d));
        }
        if (val.includes("-")) {
            const [y, m, d] = val.split("-");
            return new Date(Number(y), Number(m) - 1, Number(d));
        }
        const date = new Date(val);
        return isNaN(date.getTime()) ? null : date;
    }

    private initDate() {
        const parsed = this.parseDate(this.value);
        if (parsed) this.viewDate = parsed;
        else this.viewDate = new Date();
    }

    private getFormattedValue() {
        if (!this.value) return '';
        const date = this.parseDate(this.value);
        if (!date) return this.value;
        return new Intl.DateTimeFormat(this.options.locale, {
            day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(date);
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
        this.wrapperEl = this.createEl('div', 'k-datepicker-wrapper');
        
        if (this.options.label) {
            const id = this.options.id || `k-dp-${Math.random().toString(36).slice(2, 9)}`;
            this.options.id = id;
            this.wrapperEl.appendChild(this.createEl('label', 'k-datepicker-label', {
                htmlFor: id, textContent: this.options.label
            }));
        }

        const triggerEl = this.createEl('div', 'k-datepicker-trigger');
        
        this.inputEl = this.createEl('input', 'k-datepicker-input', {
            id: this.options.id || '',
            type: 'text',
            readOnly: true,
            disabled: !!this.options.disabled,
            value: this.getFormattedValue(),
            placeholder: this.options.placeholder || (this.options.locale?.startsWith('ru') ? 'ДД.ММ.ГГГГ' : 'DD.MM.YYYY')
        });

        if (this.options.disabled) this.inputEl.classList.add('k-datepicker-input--disabled');
        if (this.options.error) this.inputEl.classList.add('k-datepicker-input--error');

        this.inputEl.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent document click
            if (!this.options.disabled) this.toggleCalendar();
        });

        triggerEl.appendChild(this.inputEl);
        triggerEl.appendChild(this.createEl('div', 'k-datepicker-icon', { innerHTML: ICONS.calendar }));
        this.wrapperEl.appendChild(triggerEl);

        if (this.options.error) {
            this.wrapperEl.appendChild(this.createEl('p', 'k-datepicker-error-text', { textContent: this.options.error }));
        }

        this.container.appendChild(this.wrapperEl);
    }

    private toggleCalendar() {
        this.isOpen = !this.isOpen;
        this.viewMode = 'days';
        if (this.isOpen) {
            this.initDate();
            this.renderPopup();
            // trigger layout
            void this.popupEl?.offsetWidth;
            this.popupEl?.classList.add('k-datepicker-popup--visible');
        } else {
            this.popupEl?.classList.remove('k-datepicker-popup--visible');
            setTimeout(() => {
                if (this.popupEl && this.popupEl.parentNode) {
                    this.popupEl.parentNode.removeChild(this.popupEl);
                }
                this.popupEl = undefined;
            }, 150);
        }
    }

    private handleClickOutside(e: MouseEvent) {
        if (this.isOpen && this.wrapperEl && !this.wrapperEl.contains(e.target as Node)) {
            this.isOpen = false;
            this.popupEl?.classList.remove('k-datepicker-popup--visible');
            setTimeout(() => {
                if (this.popupEl && this.popupEl.parentNode) {
                    this.popupEl.parentNode.removeChild(this.popupEl);
                }
                this.popupEl = undefined;
            }, 150);
        }
    }

    private renderPopup() {
        if (this.popupEl && this.popupEl.parentNode) {
            this.popupEl.parentNode.removeChild(this.popupEl);
        }

        this.popupEl = this.createEl('div', 'k-datepicker-popup');
        this.popupEl.appendChild(this.createEl('div', 'k-datepicker-mobile-drag'));

        // Header
        const headerEl = this.createEl('div', 'k-datepicker-header');
        
        if (this.viewMode === 'days') {
            const prevBtn = this.createEl('button', 'k-datepicker-nav-btn', { innerHTML: ICONS.caretLeft });
            prevBtn.addEventListener('click', (e) => { e.preventDefault(); this.prevMonth(); });
            headerEl.appendChild(prevBtn);
        } else {
            headerEl.appendChild(this.createEl('div', 'k-datepicker-spacer'));
        }

        const titleEl = this.createEl('div', 'k-datepicker-title');
        
        const monthName = this.viewMode === 'days' 
            ? new Intl.DateTimeFormat(this.options.locale, { month: 'long' }).format(this.viewDate)
            : (this.options.locale?.startsWith('ru') ? 'Выберите год' : 'Select year');
        
        titleEl.appendChild(this.createEl('span', 'k-datepicker-month', { 
            textContent: monthName.charAt(0).toUpperCase() + monthName.slice(1)
        }));

        const yearBtn = this.createEl('button', 'k-datepicker-year-toggle', {
            textContent: this.viewDate.getFullYear().toString()
        });
        yearBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.viewMode = this.viewMode === 'days' ? 'years' : 'days';
            this.renderPopup();
            this.popupEl?.classList.add('k-datepicker-popup--visible');
        });
        titleEl.appendChild(yearBtn);
        headerEl.appendChild(titleEl);

        if (this.viewMode === 'days') {
            const nextBtn = this.createEl('button', 'k-datepicker-nav-btn', { innerHTML: ICONS.caretRight });
            nextBtn.addEventListener('click', (e) => { e.preventDefault(); this.nextMonth(); });
            headerEl.appendChild(nextBtn);
        } else {
            headerEl.appendChild(this.createEl('div', 'k-datepicker-spacer'));
        }

        this.popupEl.appendChild(headerEl);

        // Body
        if (this.viewMode === 'days') {
            const bodyEl = this.createEl('div', 'k-datepicker-body');
            
            // Weekdays
            const weekdaysEl = this.createEl('div', 'k-datepicker-weekdays');
            const fmt = new Intl.DateTimeFormat(this.options.locale, { weekday: 'short' });
            for (let i = 0; i < 7; i++) {
                const name = fmt.format(new Date(2024, 0, i + 1));
                weekdaysEl.appendChild(this.createEl('div', 'k-datepicker-weekday', {
                    textContent: name.charAt(0).toUpperCase() + name.slice(1)
                }));
            }
            bodyEl.appendChild(weekdaysEl);

            // Grid
            const gridEl = this.createEl('div', 'k-datepicker-grid');
            const year = this.viewDate.getFullYear();
            const month = this.viewDate.getMonth();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            
            let startDay = new Date(year, month, 1).getDay();
            startDay = startDay === 0 ? 6 : startDay - 1;

            for (let i = 0; i < startDay; i++) {
                gridEl.appendChild(this.createEl('div', 'k-datepicker-empty'));
            }

            const todayISO = toISODate(new Date());
            const selectedISO = this.value ? toISODate(this.parseDate(this.value)!) : null;

            for (let i = 1; i <= daysInMonth; i++) {
                const dateISO = toISODate(new Date(year, month, i));
                const dayBtn = this.createEl('button', 'k-datepicker-day', { textContent: i.toString() });
                
                if (dateISO === selectedISO) dayBtn.classList.add('k-datepicker-day--selected');
                else if (dateISO === todayISO) dayBtn.classList.add('k-datepicker-day--today');

                dayBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectDate(dateISO);
                });
                gridEl.appendChild(dayBtn);
            }
            bodyEl.appendChild(gridEl);
            this.popupEl.appendChild(bodyEl);
        } else {
            const yearsEl = this.createEl('div', 'k-datepicker-years');
            const currentYear = new Date().getFullYear();
            let selectedYearEl: HTMLButtonElement | null = null;
            
            for (let i = 0; i < 150; i++) {
                const y = currentYear + 10 - i;
                const yearBtn = this.createEl('button', 'k-datepicker-year', { textContent: y.toString() });
                if (y === this.viewDate.getFullYear()) {
                    yearBtn.classList.add('k-datepicker-year--selected');
                    selectedYearEl = yearBtn;
                }
                yearBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.viewDate = new Date(y, this.viewDate.getMonth(), 1);
                    this.viewMode = 'days';
                    this.renderPopup();
                    this.popupEl?.classList.add('k-datepicker-popup--visible');
                });
                yearsEl.appendChild(yearBtn);
            }
            this.popupEl.appendChild(yearsEl);

            if (selectedYearEl) {
                setTimeout(() => selectedYearEl!.scrollIntoView({ block: 'center' }), 10);
            }
        }

        this.wrapperEl.appendChild(this.popupEl);
    }

    private prevMonth() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
        this.renderPopup();
        this.popupEl?.classList.add('k-datepicker-popup--visible');
    }

    private nextMonth() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
        this.renderPopup();
        this.popupEl?.classList.add('k-datepicker-popup--visible');
    }

    private selectDate(iso: string) {
        this.value = iso;
        this.inputEl.value = this.getFormattedValue();
        if (this.options.onChange) this.options.onChange(this.value);
        this.toggleCalendar();
    }

    public updateOptions(newOptions: Partial<DatePickerOptions>) {
        this.options = { ...this.options, ...newOptions };
        if (newOptions.value !== undefined) {
            this.value = newOptions.value;
            this.inputEl.value = this.getFormattedValue();
            this.initDate();
        }
        if (newOptions.disabled !== undefined) {
            this.inputEl.disabled = newOptions.disabled;
            this.inputEl.classList.toggle('k-datepicker-input--disabled', newOptions.disabled);
        }
        if (newOptions.error !== undefined) {
            this.inputEl.classList.toggle('k-datepicker-input--error', !!newOptions.error);
        }
    }

    public unmount() {
        document.removeEventListener('click', this.documentClickHandler);
        this.container.innerHTML = '';
    }
}
