import type { InjectionKey, Ref } from 'vue';

export interface AccordionContext {
    multiple: boolean;
    border: boolean;
    openItems: Ref<Set<number>>;
    toggle: (index: number) => void;
    register: () => number;
}

export const AccordionKey: InjectionKey<AccordionContext> = Symbol('accordion');
