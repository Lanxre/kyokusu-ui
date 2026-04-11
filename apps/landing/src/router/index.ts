import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent, h } from 'vue'
import Home from '../views/Home.vue'

const RemoteError = {
  render() {
    return h('div', { class: 'remote-error' }, [
      h('h2', 'Remote Unavailable'),
      h('p', 'Failed to load feature island. Check your connection or the remote status.')
    ])
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/playground',
      name: 'playground',
      component: defineAsyncComponent({
        loader: () => import('playground/PlaygroundApp'),
        errorComponent: RemoteError,
        delay: 200,
        timeout: 10000
      })
    }
  ],
  scrollBehavior(to, _from, _savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

export default router
