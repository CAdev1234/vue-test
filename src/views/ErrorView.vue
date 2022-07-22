<template>
    <div class="min-h-screen w-full flex flex-col pt-10">
        <div class="mx-auto py-10 bg-gray-50 w-1/3 text-center flex flex-col gap-y-7">
            <h1>Ooops</h1>
            <div>
                <p>Your age is over our accepted limit.</p>
                <p>We are sorry but we can't insure you now</p>
            </div>
            <div class="flex justify-center">
                <RouterLink to="/">
                    <Button size="large">Ok:(</Button>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { Button } from "../components/ui/common/index"
export default defineComponent({
    components: {
    Button
},
    setup() {

    }
})
</script>

<style>
</style>