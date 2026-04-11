import { PhPaintBrush, PhLightning, PhCode, PhPuzzlePiece, PhEye, PhFeather } from '@phosphor-icons/vue'

export function useFeatures() {
  const features = [
    {
      title: 'Beautiful by Default',
      desc: 'Carefully crafted components that look stunning out of the box, requiring zero configuration for a premium feel.',
      icon: PhPaintBrush
    },
    {
      title: 'Excellent Developer Experience',
      desc: 'Built ground-up with Vue 3 Composition API and strict TypeScript. Full IDE autocompletion and type safety.',
      icon: PhCode
    },
    {
      title: 'Lightweight & Performant',
      desc: 'Zero heavy dependencies. Highly optimized rendering logic ensuring 60fps animations and instant interactions.',
      icon: PhLightning
    },
    {
      title: 'Highly Customizable',
      desc: 'Powered entirely by CSS variables. Easily adapt the design system to your brand with just a few overrides.',
      icon: PhPuzzlePiece
    },
    {
      title: 'Fully Accessible',
      desc: 'Keyboard navigation, screen reader support, and ARIA attributes built into every interactive component.',
      icon: PhEye
    },
    {
      title: 'Quiet Luxury Design',
      desc: 'Restrained, calm, and sophisticated. No flashy distracting elements—just pure, confident UI.',
      icon: PhFeather
    }
  ]

  return { features }
}
