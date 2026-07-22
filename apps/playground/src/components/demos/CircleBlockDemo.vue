<script setup lang="ts">
import { CircleBlock } from '@kyokusu-ui/vue'
import { PhStar, PhHeart, PhCrown, PhShield, PhFire } from '@phosphor-icons/vue'

const propsDescription = [
    { name: 'text', type: 'string', default: "''", desc: 'Текст. Берутся первые 2 буквы из первых двух слов (John Doe → JD).' },
    { name: 'icon', type: 'Component', default: 'undefined', desc: 'Иконка. Приоритет над text.' },
    { name: 'bg', type: 'string', default: "'#e4e4e7'", desc: 'Цвет фона.' },
    { name: 'border', type: 'boolean', default: 'false', desc: 'Белая рамка.' },
    { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", desc: 'Размер: sm (32px), md (40px), lg (56px) или число.' }
]
</script>

<template>
    <div class="component-demo">
        <div class="card">
            <h3>From Text</h3>
            <p class="card-desc">Первые буквы двух слов</p>
            <div class="demo-flex">
                <CircleBlock text="John Doe" bg="#3b82f6" />
                <CircleBlock text="Alice Smith" bg="#8b5cf6" />
                <CircleBlock text="Bob" bg="#10b981" />
                <CircleBlock text="Charlie Brown" bg="#f59e0b" />
                <CircleBlock text="Дмитрий Иванов" bg="#ef4444" />
            </div>
        </div>

        <div class="card">
            <h3>With Icons</h3>
            <div class="demo-flex">
                <CircleBlock :icon="PhStar" bg="#3b82f6" />
                <CircleBlock :icon="PhHeart" bg="#ef4444" />
                <CircleBlock :icon="PhCrown" bg="#f59e0b" />
                <CircleBlock :icon="PhShield" bg="#10b981" />
                <CircleBlock :icon="PhFire" bg="#8b5cf6" />
            </div>
        </div>

        <div class="card">
            <h3>Default (no text, no icon)</h3>
            <div class="demo-flex">
                <CircleBlock />
                <CircleBlock bg="#3b82f6" />
                <CircleBlock bg="#10b981" />
            </div>
        </div>

        <div class="card">
            <h3>Sizes</h3>
            <div class="demo-flex items-center">
                <CircleBlock text="SM" size="sm" bg="#3b82f6" />
                <CircleBlock text="MD" size="md" bg="#8b5cf6" />
                <CircleBlock text="LG" size="lg" bg="#10b981" />
                <CircleBlock text="72" :size="72" bg="#f59e0b" />
            </div>
        </div>

        <div class="card">
            <h3>With Border</h3>
            <div class="demo-flex">
                <CircleBlock text="Border" bg="#3b82f6" border />
                <CircleBlock :icon="PhStar" bg="#8b5cf6" border />
                <CircleBlock text="LG" size="lg" bg="#10b981" border />
            </div>
        </div>

        <div class="card">
            <h3>Colors</h3>
            <div class="demo-flex">
                <CircleBlock text="Blue" bg="#3b82f6" />
                <CircleBlock text="Purple" bg="#8b5cf6" />
                <CircleBlock text="Green" bg="#10b981" />
                <CircleBlock text="Red" bg="#ef4444" />
                <CircleBlock text="Amber" bg="#f59e0b" />
                <CircleBlock text="Pink" bg="#ec4899" />
                <CircleBlock text="Cyan" bg="#06b6d4" />
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
    gap: 12px;
    margin-top: 16px;
    align-items: center;
}

.items-center {
    align-items: center;
}

.card-desc {
    font-size: 13px;
    color: var(--text-muted);
    margin-top: 4px;
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
