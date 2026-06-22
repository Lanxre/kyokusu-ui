<script setup lang="ts">
import { useTeleportedTooltip } from './useTeleportedTooltip';
import './TeleportedTooltip.css';

const props = withDefaults(
	defineProps<{
		text: string;
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
	}>(),
	{
		position: 'top',
		delay: 200,
	},
);

const { triggerRef, visible, pos, show, hide } = useTeleportedTooltip(props.position);
</script>

<template>
	<div
		ref="triggerRef"
		class="k-ttip-wrapper"
		@mouseenter="show(delay)"
		@mouseleave="hide"
	>
		<slot />
		<Teleport to="body">
			<Transition name="k-ttip">
				<div
					v-if="visible && text"
					:style="pos"
					class="k-ttip-content"
				>
					<div class="k-ttip-box">
						{{ text }}
						<div
							class="k-ttip-arrow"
							:class="`k-ttip-arrow--${position}`"
						></div>
					</div>
				</div>
			</Transition>
		</Teleport>
	</div>
</template>