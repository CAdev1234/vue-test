<template>
    <div class="relative flex flex-col gap-y-2">
        <label v-if="Boolean(label)">{{label}}</label>            
        <div 
            class="flex items-center justify-between p-2 border border-gray-200 cursor-pointer"
            @click="handleActive"
        >
            <span>{{currentItem.label}}</span>
            <CaretDownIcon v-if="!active"></CaretDownIcon>
            <CaretUpIcon v-else></CaretUpIcon>
        </div>
        <ul 
            v-if="active" 
            :class="[`absolute flex flex-col w-full z-[5] bg-white`, `${Boolean(label) ? 'top-20' : 'top-12'}`]"
        >
            <li 
                v-for="(item, idx) in options"
                :key="idx"
                class="p-2 border border-gray-200 cursor-pointer hover:text-gray-300"
                @click="() => handleUpdateItem(idx)"
            >{{item.label}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from 'vue';
import CaretDownIcon from '../../icons/CaretDownIcon.vue';
import CaretUpIcon from '../../icons/CaretUpIcon.vue';
interface SelectOptionType {
    label: string,
    value: string
}
export default defineComponent({
    name: 'Select',
    components: { CaretDownIcon, CaretUpIcon },
    props: {
        options: {
            type: Array<any>,
            required: true
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        name: {
            type: String,
            required: true
        },
        defaultValue: {
            type: Object as PropType<SelectOptionType>,
            default: {}
        }
    },
    emits: {
        onSelect: null
    },
    setup(props, context) {
        let active = ref<boolean>(false);
        let currentItem = ref<SelectOptionType>({
            label: props.defaultValue.label, 
            value: props.defaultValue.value
        })

        const handleActive = () => {
            active.value = !active.value
        }
        const handleUpdateItem = (idx: number) => {
            currentItem.value = props.options[idx]
            active.value = !active.value
            context.emit('onSelect', props.options[idx])
        }
        return {
            active,
            currentItem,
            handleActive,
            handleUpdateItem
        };
    },
})
</script>

<style scoped>
</style>