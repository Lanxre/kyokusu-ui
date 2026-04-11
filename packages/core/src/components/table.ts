import '../styles/table.css';

export interface TableHeader {
    key: string;
    label: string;
    sortable?: boolean;
    align?: 'left' | 'center' | 'right';
}

export interface TableOptions {
    headers: TableHeader[];
    items: any[];
    searchable?: boolean;
    searchPlaceholder?: string;
    showActions?: boolean;
    emptyText?: string;
    loading?: boolean;
}

export class Table {
    private element: HTMLDivElement;
    private options: TableOptions;

    constructor(element: HTMLDivElement | string, options: TableOptions) {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (!target) {
            this.element = document.createElement('div');
        } else {
            this.element = target as HTMLDivElement;
        }

        this.options = {
            searchable: true,
            searchPlaceholder: 'Search...',
            showActions: true,
            emptyText: 'No data found',
            loading: false,
            ...options
        };

        this.mount();
    }

    private mount() {
        this.element.className = 'k-table-container';
        // Note: Full reactive Vanilla JS implementation of sorting/filtering 
        // is typically handled by the framework wrapper (Vue/React).
        // The core package primarily provides the CSS and base typings.
    }

    public getElement() {
        return this.element;
    }

    public updateOptions(newOptions: Partial<TableOptions>) {
        this.options = { ...this.options, ...newOptions };
        this.mount();
    }

    public unmount() {
        this.element.innerHTML = '';
        this.element.className = '';
    }
}
