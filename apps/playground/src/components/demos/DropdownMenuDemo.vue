<script setup lang="ts">
import { ref } from 'vue'
import { DropdownMenu, Button } from '@kyokusu-ui/vue'
import type { MenuItem } from '@kyokusu-ui/vue'
import PropsTable from '../props/PropsTable.vue'
import {
    PhUser,
    PhGearSix,
    PhCopy,
    PhTrash,
    PhStar,
    PhArrowsClockwise,
    PhLink,
    PhCode,
    PhDownload,
    PhFolderOpen,
    PhFile,
    PhFilePdf,
    PhFileImage,
    PhFileText,
    PhPrinter
} from '@phosphor-icons/vue'

// --- Basic ---
const basicItems: MenuItem[] = [
    { id: 'profile', label: 'Profile', icon: PhUser, action: () => console.log('Profile') },
    { id: 'settings', label: 'Settings', icon: PhGearSix, action: () => console.log('Settings') },
    { id: 'copy', label: 'Copy', icon: PhCopy, action: () => console.log('Copy') },
    { id: 'sep1', label: '', separator: true },
    { id: 'delete', label: 'Delete', icon: PhTrash, action: () => console.log('Delete') }
]

// --- Hover ---
const hoverItems: MenuItem[] = [
    { id: 'star', label: 'Add to favorites', icon: PhStar },
    { id: 'copy-link', label: 'Copy link', icon: PhLink },
    { id: 'embed', label: 'Embed', icon: PhCode }
]

// --- Disabled ---
const disabledItems: MenuItem[] = [
    { id: 'cut', label: 'Cut', action: () => {} },
    { id: 'copy-disabled', label: 'Copy', disabled: true },
    { id: 'paste', label: 'Paste', action: () => {} },
    { id: 'sep', label: '', separator: true },
    { id: 'select-all', label: 'Select all' }
]

// --- Submenu ---
const submenuItems: MenuItem[] = [
    {
        id: 'file',
        label: 'File',
        icon: PhFolderOpen,
        submenu: [
            { id: 'new', label: 'New file', icon: PhFile },
            { id: 'open', label: 'Open...', icon: PhFolderOpen },
            { id: 'sep', label: '', separator: true },
            {
                id: 'export',
                label: 'Export as',
                icon: PhDownload,
                submenu: [
                    { id: 'pdf', label: 'PDF', icon: PhFilePdf, action: () => console.log('PDF') },
                    { id: 'png', label: 'PNG', icon: PhFileImage },
                    { id: 'txt', label: 'Text', icon: PhFileText }
                ]
            }
        ]
    },
    { id: 'print', label: 'Print', icon: PhPrinter },
    { id: 'sep', label: '', separator: true },
    { id: 'refresh', label: 'Refresh', icon: PhArrowsClockwise }
]

// --- Radio ---
const radioValue = ref('medium')
const radioItems: MenuItem[] = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
    { id: 'sep', label: '', separator: true },
    { id: 'xlarge', label: 'Extra Large' }
]

// --- Checkbox ---
const checkboxValue = ref<string[]>(['bold'])
const checkboxItems: MenuItem[] = [
    { id: 'bold', label: 'Bold' },
    { id: 'italic', label: 'Italic' },
    { id: 'underline', label: 'Underline' },
    { id: 'sep', label: '', separator: true },
    { id: 'strikethrough', label: 'Strikethrough' }
]

// --- Props ---
const propsDescription = [
    { name: 'items', type: 'MenuItem[]', default: '—', desc: 'Массив элементов меню.' },
    { name: 'trigger', type: "'click' | 'hover'", default: "'click'", desc: 'Тип триггера для открытия меню.' },
    { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", desc: 'Позиция меню относительно триггера.' },
    { name: 'width', type: 'number | string', default: '200', desc: 'Ширина меню в пикселях.' },
    { name: 'offset', type: 'number', default: '8', desc: 'Отступ от триггера в пикселях.' },
    { name: 'selectionType', type: "'none' | 'radio' | 'checkbox'", default: "'none'", desc: 'Режим выбора: обычное меню, радио или чекбоксы.' },
    { name: 'v-model', type: 'string | string[]', default: 'null', desc: 'Выбранное значение (string для radio, string[] для checkbox).' }
]

const itemPropsDescription = [
    { name: 'id', type: 'string', default: '—', desc: 'Уникальный идентификатор элемента.' },
    { name: 'label', type: 'string', default: '—', desc: 'Отображаемый текст.' },
    { name: 'icon', type: 'Component', default: 'undefined', desc: 'Компонент иконки слева от текста.' },
    { name: 'action', type: '() => void', default: 'undefined', desc: 'Callback при клике на элемент.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Заблокирован ли элемент.' },
    { name: 'separator', type: 'boolean', default: 'false', desc: 'Отображать как разделитель.' },
    { name: 'submenu', type: 'MenuItem[]', default: 'undefined', desc: 'Вложенное подменю.' },
    { name: 'checked', type: 'boolean', default: 'false', desc: 'Начальное состояние отмеченности.' }
]
</script>

<template>
    <div class="component-demo">
        <div class="card">
            <h3>Basic</h3>
            <p class="card-desc">Классическое выпадающее меню с иконками и разделителем</p>
            <div class="demo-flex">
                <DropdownMenu :items="basicItems" placement="bottom-start">
                    <Button variant="secondary" size="md">Actions</Button>
                </DropdownMenu>
            </div>
        </div>

        <div class="card">
            <h3>Hover Trigger</h3>
            <p class="card-desc">Меню открывается при наведении мыши</p>
            <div class="demo-flex">
                <DropdownMenu :items="hoverItems" trigger="hover" placement="bottom-start">
                    <Button variant="ghost" size="md">Hover me</Button>
                </DropdownMenu>
            </div>
        </div>

        <div class="card">
            <h3>Disabled Items</h3>
            <p class="card-desc">Отдельные элементы можно заблокировать</p>
            <div class="demo-flex">
                <DropdownMenu :items="disabledItems" placement="bottom-start">
                    <Button variant="secondary" size="md">Edit</Button>
                </DropdownMenu>
            </div>
        </div>

        <div class="card">
            <h3>With Submenus</h3>
            <p class="card-desc">Вложенные подменю, открываются по клику или наведению</p>
            <div class="demo-flex">
                <DropdownMenu :items="submenuItems" placement="bottom-start">
                    <Button variant="secondary" size="md">File menu</Button>
                </DropdownMenu>
            </div>
        </div>

        <div class="card">
            <h3>Placements</h3>
            <p class="card-desc">4 варианта позиционирования относительно триггера</p>
            <div class="demo-grid">
                <div class="demo-cell">
                    <DropdownMenu :items="basicItems" placement="bottom-start">
                        <Button variant="secondary" size="md">Bottom Start</Button>
                    </DropdownMenu>
                </div>
                <div class="demo-cell">
                    <DropdownMenu :items="basicItems" placement="bottom-end">
                        <Button variant="secondary" size="md">Bottom End</Button>
                    </DropdownMenu>
                </div>
                <div class="demo-cell">
                    <DropdownMenu :items="basicItems" placement="top-start">
                        <Button variant="secondary" size="md">Top Start</Button>
                    </DropdownMenu>
                </div>
                <div class="demo-cell">
                    <DropdownMenu :items="basicItems" placement="top-end">
                        <Button variant="secondary" size="md">Top End</Button>
                    </DropdownMenu>
                </div>
            </div>
        </div>

        <div class="card">
            <h3>Radio Selection</h3>
            <p class="card-desc">Одиночный выбор из группы</p>
            <div class="demo-flex">
                <DropdownMenu
                    v-model="radioValue"
                    :items="radioItems"
                    selection-type="radio"
                    placement="bottom-start"
                >
                    <Button variant="secondary" size="md">
                        Size: {{ radioValue }}
                    </Button>
                </DropdownMenu>
                <span class="demo-value">Selected: <code>{{ radioValue }}</code></span>
            </div>
        </div>

        <div class="card">
            <h3>Checkbox Selection</h3>
            <p class="card-desc">Множественный выбор</p>
            <div class="demo-flex">
                <DropdownMenu
                    v-model="checkboxValue"
                    :items="checkboxItems"
                    selection-type="checkbox"
                    placement="bottom-start"
                >
                    <Button variant="secondary" size="md">Format</Button>
                </DropdownMenu>
                <span class="demo-value">Selected: <code>{{ checkboxValue }}</code></span>
            </div>
        </div>

        <PropsTable :items="propsDescription" />
        <PropsTable :items="itemPropsDescription" />
    </div>
</template>

<style scoped>
.demo-flex {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
}

.demo-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-top: 16px;
}

.demo-cell {
    display: flex;
    justify-content: center;
}

.demo-value {
    font-size: 13px;
    color: var(--text-muted);
}

.demo-value code {
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
    background: var(--bg-hover-secondary);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    color: #3b82f6;
}

.card-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 4px;
}

@media (max-width: 640px) {
    .demo-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
