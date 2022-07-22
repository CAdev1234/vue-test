<template>
    <div class="flex flex-col gap-y-2">
        <label for="custom-input">{{label}}</label>
        <input
            id="custom-input" 
            :type="type" 
            class="p-2 border border-gray-200" 
            :placeholder="placeholder"
            :name="name"
            :value="modelValue"
            @input="handleUpdateValue"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
type EditorType = 'text' | 'number' | 'email'
export default defineComponent({
    name: 'Input',
    emits: ['update:modelValue'],
    props: {
        label: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String as PropType<EditorType>,
            default: 'text'
        },
        name: {
            type: String,
            required: true
        },
        modelValue: {
            type: String || Number,
            required: true
        }
    },
    setup(props, context) {
        const handleUpdateValue = (evt: any) => {
            context.emit('update:modelValue', evt.target.value.trim())
        } 
        return {
            handleUpdateValue
        }
    },
})
</script>

<style scoped>
</style>