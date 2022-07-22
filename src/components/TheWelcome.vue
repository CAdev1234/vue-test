<template>
<div class="w-full h-screen flex flex-col">
  <div class="m-auto flex flex-col text-center gap-y-3">
    <h1>Hello There!</h1>
    <p>Let's buy some insurance. It is going to take only a few steps</p>
    <RouterLink class="mt-1 mx-auto" to="/calc">
      <Button>Start</Button>
    </RouterLink>
  </div>
  
</div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Button from './ui/common/Button.vue';
</script>