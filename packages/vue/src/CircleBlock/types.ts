import type { Component } from 'vue'

export type CircleBlockSize = 'sm' | 'md' | 'lg' | number

export interface CircleBlockProps {
    /** Текст. Берутся первые 2 буквы из первых двух слов. */
    text?: string
    /** Иконка (компонент Phosphor или другой). Приоритет над text. */
    icon?: Component
    /** Картинка (URL или импорт). Приоритет над icon и text. */
    src?: string
    /** Цвет фона */
    bg?: string
    color?: string
    /** Показать белую рамку */
    border?: boolean
    /** Размер: 'sm' (32px), 'md' (40px), 'lg' (56px) или число в пикселях */
    size?: CircleBlockSize
}
