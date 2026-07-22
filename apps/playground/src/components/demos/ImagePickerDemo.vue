<script setup lang="ts">
import { ref } from 'vue'
import { ImagePicker } from '@kyokusu-ui/vue'

const propsDescription = [
    { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", desc: 'Размер превью (80, 120, 160 пикселей).' },
    { name: 'border', type: "'solid' | 'dashed' | 'none'", default: "'dashed'", desc: 'Стиль бордера.' },
    { name: 'shape', type: "'square' | 'circle'", default: "'square'", desc: 'Форма превью.' },
    { name: 'accept', type: 'string', default: "'image/*'", desc: 'Допустимые типы файлов.' },
    { name: 'maxSize', type: 'number', default: '5', desc: 'Максимальный размер файла в МБ.' },
    { name: 'label', type: 'string', default: "''", desc: 'Заголовок над превью.' },
    { name: 'placeholder', type: 'string', default: "'Нажмите или перетащите изображение'", desc: 'Текст при пустом превью.' },
    { name: 'disabled', type: 'boolean', default: 'false', desc: 'Заблокирован ли компонент.' },
    { name: 'v-model', type: 'File | null', default: 'null', desc: 'Выбранный файл.' }
]

const avatarFile = ref<File | null>(null)
const bannerFile = ref<File | null>(null)
const circleFile = ref<File | null>(null)
const smallFile = ref<File | null>(null)
const largeFile = ref<File | null>(null)
const solidFile = ref<File | null>(null)

const handleError = (msg: string) => {
    console.warn(msg)
}
</script>

<template>
    <div class="component-demo">
        <div class="card">
            <h3>Sizes</h3>
            <div class="demo-flex">
                <ImagePicker v-model="smallFile" size="sm" placeholder="Small" @error="handleError" />
                <ImagePicker v-model="bannerFile" size="md" placeholder="Medium" @error="handleError" />
                <ImagePicker v-model="largeFile" size="lg" placeholder="Large" @error="handleError" />
                <ImagePicker :size="200" placeholder="Custom (200px)" @error="handleError" />
            </div>
        </div>

        <div class="card">
            <h3>Shapes</h3>
            <div class="demo-flex">
                <ImagePicker shape="square" placeholder="Square" @error="handleError" />
                <ImagePicker v-model="circleFile" shape="circle" placeholder="Circle" @error="handleError" />
            </div>
        </div>

        <div class="card">
            <h3>Borders</h3>
            <div class="demo-flex">
                <ImagePicker border="dashed" placeholder="Dashed" @error="handleError" />
                <ImagePicker v-model="solidFile" border="solid" placeholder="Solid" @error="handleError" />
                <ImagePicker border="none" placeholder="No border" @error="handleError" />
            </div>
        </div>

        <div class="card">
            <h3>With Label</h3>
            <div class="demo-flex">
                <ImagePicker v-model="avatarFile" label="Аватар" placeholder="Загрузите фото" @error="handleError" />
                <ImagePicker shape="circle" label="Фото профиля" placeholder="Перетащите сюда" @error="handleError" />
            </div>
        </div>

        <div class="card">
            <h3>Disabled</h3>
            <div class="demo-flex">
                <ImagePicker disabled placeholder="Заблокировано" />
            </div>
        </div>

        <div class="card">
            <h3>Custom Size</h3>
            <div class="demo-flex">
                <ImagePicker :size="60" shape="circle" placeholder="60px" @error="handleError" />
                <ImagePicker :size="100" shape="circle" placeholder="100px" @error="handleError" />
                <ImagePicker :size="180" placeholder="180px" @error="handleError" />
            </div>
        </div>

        <div class="card props-table-card">
            <h3>Props Reference</h3>
            <div class="table-wrapper">
                <table class="props-table">
                    <thead>
                        <tr>
                            <th>Property</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="prop in propsDescription" :key="prop.name">
                            <td class="prop-name"><code>{{ prop.name }}</code></td>
                            <td class="prop-type"><code>{{ prop.type }}</code></td>
                            <td class="prop-default"><code>{{ prop.default }}</code></td>
                            <td class="prop-desc">{{ prop.desc }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
.demo-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 16px;
    align-items: flex-start;
}

.props-table-card { overflow: hidden; padding: 0; }
.props-table-card h3 { padding: 24px 24px 0 24px; }
.table-wrapper { overflow-x: auto; margin-top: 12px; }
.props-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }
.props-table th { background: var(--bg-hover-secondary); padding: 12px 24px; color: var(--text-main); font-weight: 600; border-bottom: 1px solid var(--border-color); }
.props-table td { padding: 16px 24px; border-bottom: 1px solid var(--border-color); color: var(--text-main); vertical-align: top; }
.props-table tr:last-child td { border-bottom: none; }
.prop-name code { color: #ec4899; font-weight: 600; }
.prop-type code { color: #3b82f6; }
.prop-default code { color: var(--text-muted); }
.prop-desc { line-height: 1.5; color: var(--text-muted); }
code { font-family: 'JetBrains Mono', 'Fira Code', monospace; background: var(--bg-hover-secondary); padding: 2px 6px; border-radius: 4px; font-size: 12px; }
</style>
