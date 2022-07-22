<template>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-else class="min-h-screen flex flex-col">
        <div class="m-auto flex flex-col gap-y-5">
            <h1>Tell us about yourself</h1>
            <div class="max-w-[250px] flex flex-col gap-y-5 self-center">
                <Input
                    label="Name"
                    name="name" 
                    placeholder="Add text"
                    v-model="name"
                />
                <Input
                    label="Age"
                    type="number"
                    name="age"
                    v-model="age"
                />
                <Select 
                    :options="countryData"
                    :is-label="true"
                    name="country"
                    label="Where do you live"
                    :default-value="country"
                    @on-select="handleUpdateCountry"
                ></Select>
                <RadioGroup
                    :items="pkageData"
                    type="Package"
                    :default-value-idx="pkageIdx"
                    @on-select="handleUpdatePackage"
                ></RadioGroup>
            </div>
            

            <span class="mt-5 flex items-center justify-center gap-x-6"><h2>Your premium is: </h2><h2>{{pkageData[pkageIdx].price}}{{pkageData[pkageIdx].currency}}</h2></span>
            <span class="mt-12 flex items-center justify-center gap-x-2">
                <Button 
                    variant="outline"
                    size="small"
                    @click="handleBack"
                >Back</Button>
                <Button 
                    size="small" 
                    @click="handleSubmit"
                >Next</Button>
                
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import {
    Input,
    Select,
    RadioGroup,
    Button,
    LoadingSpinner
} from '../components/ui/common/index'
import type { CountryType, PackageType, SummaryType } from '../models/type'
import { COUNTRY_DATA, PACKAGE_DATA } from '../constant/index'
import storage, { StorageType } from '../utils/storage'
import { defineComponent, onMounted, reactive, ref, toRaw, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import {Keys} from '../constant/index'

export default defineComponent({
    components: {
        Input,
        Select,
        RadioGroup,
        Button,
        LoadingSpinner
    },
    setup() {
        const countryData = COUNTRY_DATA
        const router = useRouter()
        const isLoading = ref<Boolean>(true)
        const state = reactive<SummaryType>({
            name: '',
            age: 0,
            country: countryData[0],
            pkageIdx: 0,
            pkageData: []
        })
        onMounted(() => {
            const data = storage.rcGetItem(StorageType.local, Keys.summaryStorageKey)
            if (data) {
                state.name = data.name
                state.age = data.age
                state.country = data.country
                state.pkageData = data.pkageData
                state.pkageIdx = data.pkageIdx
            }else {
                state.pkageData = calcPackageDataByCountry()
            }
            isLoading.value = false
        })

        const handleUpdateCountry = (val: CountryType) => {
            state.country = val
        }
        const handleUpdatePackage = (idx: number) => {
            state.pkageIdx = idx
            
        }
        const validateForm = () => {
            let result = true
            if (state.age > 100) {
                router.push({path: '/:pathMatch(.*)*'})
                result = false
            }
            if (!Boolean(state.name)) {
                result = false
            }
            if (state.age < 1) result = false
            return result
        }
        const handleBack = () => {
            storage.rcRemoveItem(StorageType.local, Keys.summaryStorageKey)
            router.push({path: '/'})
        }
        const handleSubmit = () => {
            const data = toRaw(state)
            const isValid = validateForm()
            if (!isValid) {
                window.alert("Please fill inputs or age couldn't be 0")
                return
            }
            const summaryData:SummaryType = {
                name: data.name,
                age: Number(data.age),
                country: data.country,
                pkageIdx: data.pkageIdx,
                pkageData: data.pkageData
            }
            storage.rcSetItem(StorageType.local, Keys.summaryStorageKey, summaryData)
            router.push({
                path: '/summary'
            })
        }
        const calcPackageDataByCountry = () => {
            let result: Array<PackageType> = []
            const {age, country} = toRefs(state)
            for (let index = 0; index < Object.keys(PACKAGE_DATA).length; index++) {
                result.push({
                    type: Object.keys(PACKAGE_DATA)[index],
                    price: 10 * age.value * Object.values(PACKAGE_DATA)[index].rate / 100 * country.value.rate,
                    percent: Object.values(PACKAGE_DATA)[index].rate,
                    currency: country.value.currency
                })
            }
            return result
        }
        

        watch(() => state.country, (currentValue, oldValue) => {
            state.pkageData = calcPackageDataByCountry()
        })
        watch(() => state.age, (currentValue, oldValue) => {
            state.pkageData = calcPackageDataByCountry()
        })

        return {
            isLoading,
            ...toRefs(state),
            countryData,
            handleUpdateCountry,
            handleUpdatePackage,
            handleBack,
            handleSubmit
        }
    }
})

</script>

<style>
</style>