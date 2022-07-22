<template>
    <ul class="flex flex-col gap-y-3">
        <li 
            v-for="(item, idx) in items"
            :key="idx"
            class="flex items-center gap-x-2 cursor-pointer"
            @click="() => handleUpdateActiveIdx(idx)"
        >
            <span
                :class="[`rounded-full w-4 h-4`, `${idx === activeIdx ? 'border-4 border-blue-500' : 'border border-gray-300'}`]"
            ></span>
            <label
                v-if="type === 'General'"
                class="cursor-pointer"
                for=""
            >{{(item as any).label}}</label>
            <label
                v-else-if="type === 'Package'"
                class="cursor-pointer"
                for=""
            >{{handlePackageDesc(item as any)}}</label>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import type { PropType } from 'vue'
import type { PackageType } from "../../../models/type"
interface ItemGeneralType {
    label: string,
    value: string
}
type RadioType = 'Package' | 'General'
export default defineComponent({
    name: 'RadioGroup',
    props: {
        items: {
            type: Array<ItemGeneralType | PackageType>,
            required: true
        },
        type: {
            type: String as PropType<RadioType>,
            default: 'General'
        },
        defaultValueIdx: {
            type: Number,
            default: 0
        }
    },
    emits: {
        onSelect: null
    },
    setup(props, context) {
        let activeIdx = ref<number>(props.defaultValueIdx)
        const handleUpdateActiveIdx = (idx: number) => {
            activeIdx.value = idx
            context.emit('onSelect', idx)
        }
        const handlePackageDesc = (item: PackageType) => {
            return `${item.type} ${item.type !== "Standard" ? `(+${item.price}${item.currency}, ${item.percent - 100}%)` : ''}`
        }
        return {
            activeIdx,
            handleUpdateActiveIdx,
            handlePackageDesc
        }
    }
})
</script>

<style scoped>
</style>