import '../styles/label.css';

export interface LabelOptions {
    label: string;
    for?: string;
}

export class Label {
    private container: HTMLElement;
    private options: LabelOptions;
    private labelEl!: HTMLLabelElement;

    constructor(element: HTMLElement | string, options: LabelOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) throw new Error('[Kyokusu UI] Target element for Label not found');

        this.container = target as HTMLElement;
        this.options = options;

        this.mount();
    }

    private mount() {
        this.container.innerHTML = '';
        
        if (!this.options.label) return;

        this.labelEl = document.createElement('label');
        this.labelEl.className = 'k-label';
        this.labelEl.textContent = this.options.label;
        
        if (this.options.for) {
            this.labelEl.htmlFor = this.options.for;
        }

        this.container.appendChild(this.labelEl);
    }

    public updateOptions(newOptions: Partial<LabelOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public unmount() {
        this.container.innerHTML = '';
    }
}