<script setup lang="ts">
import { Accordion, AccordionItem } from '@kyokusu-ui/vue'

const propsDescription = [
  { name: 'multiple', type: 'boolean', default: 'false', desc: 'Allow multiple items to be open at once.' },
  { name: 'border', type: 'boolean', default: 'true', desc: 'Show border around the accordion and between items.' }
]

const itemPropsDescription = [
  { name: 'title', type: 'string', default: 'undefined', desc: 'Title displayed in the trigger button.' }
]
</script>

<template>
  <div class="component-demo">
    <div class="card">
      <h3>Basic Accordion</h3>
      <Accordion>
        <AccordionItem title="What is Kyokusu UI?">
          <p>Kyokusu UI is a premium, minimalist UI component library for Vue 3. It's designed with quiet luxury in mind and engineered for high-performance modern web applications.</p>
        </AccordionItem>
        <AccordionItem title="How do I install it?">
          <p>Install via npm: <code>npm install @kyokusu-ui/vue</code>. Then import the components you need in your Vue files.</p>
        </AccordionItem>
        <AccordionItem title="Is it free to use?">
          <p>Yes, Kyokusu UI is open source and free to use in both personal and commercial projects.</p>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="card">
      <h3>Without Border</h3>
      <Accordion :border="false">
        <AccordionItem title="Borderless Item 1">
          <p>This accordion has no border around it or between items.</p>
        </AccordionItem>
        <AccordionItem title="Borderless Item 2">
          <p>The items are separated only by hover states.</p>
        </AccordionItem>
        <AccordionItem title="Borderless Item 3">
          <p>Clean and minimal appearance.</p>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="card">
      <h3>Multiple Open</h3>
      <Accordion multiple>
        <AccordionItem title="First Section">
          <p>With the <code>multiple</code> prop, you can open as many sections as you want at the same time.</p>
        </AccordionItem>
        <AccordionItem title="Second Section">
          <p>This section can stay open while you open others.</p>
        </AccordionItem>
        <AccordionItem title="Third Section">
          <p>Try clicking all of them!</p>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="card">
      <h3>Accordion with Cards</h3>
      <p style="font-size: 14px; color: var(--text-muted); margin-bottom: 16px;">
        Accordion items use card-like styling with background, hover states, and borders.
      </p>
      <Accordion>
        <AccordionItem title="Account Settings">
          <p>Manage your account preferences, email notifications, and privacy settings here.</p>
        </AccordionItem>
        <AccordionItem title="Billing Information">
          <p>View and update your payment methods, download invoices, and manage subscriptions.</p>
        </AccordionItem>
        <AccordionItem title="Security">
          <p>Enable two-factor authentication, manage connected apps, and review login history.</p>
        </AccordionItem>
      </Accordion>
    </div>

    <div class="card props-table-card">
      <h3>Accordion Props</h3>
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

    <div class="card props-table-card">
      <h3>AccordionItem Props</h3>
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
            <tr v-for="prop in itemPropsDescription" :key="prop.name">
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
code {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  background: var(--bg-hover-secondary);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
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
</style>
