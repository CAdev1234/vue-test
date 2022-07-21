<template>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else class="min-h-screen flex flex-col">
        <div class="m-auto flex flex-col gap-y-3 text-center">
            <h1>Summary</h1>
            <h2>${name}.</h2>
            <p>Name: {{name}}</p>
            <p>Age: {{age}}</p>
            <p>Where do you live: {{country.label}}</p>
            <p>Package: {{pkageData[pkageIdx].type}}</p>
            <p>Premium: {{pkageData[pkageIdx].price}}{{pkageData[pkageIdx].currency}}</p>
            <span class="mt-5 flex items-center gap-x-2">
                <RouterLink to="/calc">
                    <Button variant="outline" size="small">Back</Button>
                </RouterLink>
                <Button size="small">Buy</Button>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, toRefs } from "vue";
import {
    Button,
    LoadingSpinner
} from "../components/ui/common/index";
import storage, { StorageType } from "../utils/storage";
import { Keys } from '../constant/index'
import { CountryType, SummaryType } from "../models/type";
export default {
    components: {
    Button,
    LoadingSpinner
},
    setup() {
        const state = reactive<SummaryType>({
            name: '',
            age: 0,
            country: {} as CountryType,
            pkageIdx: 0,
            pkageData: []
        });
        const isLoading = ref<Boolean>(true)
        onMounted(() => {
            const data = storage.rcGetItem(StorageType.local, Keys.summaryStorageKey)
            state.name = data.name
            state.age = data.age
            state.country = data.country
            state.pkageIdx = data.pkageIdx
            state.pkageData = data.pkageData
            isLoading.value = false
        })
        return {
            isLoading,
            ...toRefs(state)
        }
    }
}
</script>

<style scoped>
</style>