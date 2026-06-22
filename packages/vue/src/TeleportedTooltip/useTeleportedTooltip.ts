import { ref, nextTick, onMounted, onUnmounted } from 'vue';

export function useTeleportedTooltip(position: 'top' | 'bottom' | 'left' | 'right') {
	const triggerRef = ref<HTMLElement | null>(null);
	const visible = ref(false);
	const pos = ref<Record<string, string>>({});

	let timer: ReturnType<typeof setTimeout> | null = null;

	function reposition() {
		if (!triggerRef.value || !visible.value) return;
		const r = triggerRef.value.getBoundingClientRect();
		const gap = 8;

		const s: Record<string, string> = {
			position: 'fixed',
			zIndex: '100',
			pointerEvents: 'none',
			whiteSpace: 'nowrap',
		};

		switch (position) {
			case 'top':
				s.left = `${r.left + r.width / 2}px`;
				s.top = `${r.top - gap}px`;
				s.transform = 'translate(-50%, -100%)';
				break;
			case 'bottom':
				s.left = `${r.left + r.width / 2}px`;
				s.top = `${r.bottom + gap}px`;
				s.transform = 'translateX(-50%)';
				break;
			case 'left':
				s.top = `${r.top + r.height / 2}px`;
				s.left = `${r.left - gap}px`;
				s.transform = 'translate(-100%, -50%)';
				break;
			case 'right':
				s.top = `${r.top + r.height / 2}px`;
				s.left = `${r.right + gap}px`;
				s.transform = 'translateY(-50%)';
				break;
		}

		pos.value = s;
	}

	function show(delay: number) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			visible.value = true;
			nextTick(reposition);
		}, delay);
	}

	function hide() {
		if (timer) clearTimeout(timer);
		visible.value = false;
	}

	onMounted(() => {
		window.addEventListener('scroll', reposition, { capture: true });
		window.addEventListener('resize', reposition);
	});

	onUnmounted(() => {
		window.removeEventListener('scroll', reposition, { capture: true });
		window.removeEventListener('resize', reposition);
		if (timer) clearTimeout(timer);
	});

	return { triggerRef, visible, pos, show, hide };
}
