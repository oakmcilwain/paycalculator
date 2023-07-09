<script setup>
import { ref } from 'vue'
const activity = ref(null)
const activityKey = ref(1)
</script>
<template>
    <v-sheet>
        <NuxtLayout>
            <!-- <Activity ref="activity" :key="activityKey" />
            <VutifySass @click="activityKey++" /> -->
            <PayCalculator />
        </NuxtLayout>
    </v-sheet>
</template>
  