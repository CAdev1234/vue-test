<template>
    <button
        :class="[
            `w-fit
            py-2
            font-semibold
            rounded
            hover:opacity-70
            focus:outline-none`,
            size === 'large' ? `px-28` : size === 'small' ? `px-8` : `px-12`,
            variant === 'outline' ? 'bg-white text-black border border-black' : 'bg-black text-white border border-black'
        ]"
    >
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import {
    defineProps,
    PropType,
} from 'vue';
type SizeType = 'normal' | 'small' | 'large';
type VariantType = 'primary' | 'outline';
defineProps({
    size: {
        type: String as PropType<SizeType>,
        default: 'normal'
    },
    variant: {
        type: String as PropType<VariantType>,
        default: 'primary'
    }
})
</script>

<style scoped>
</style>