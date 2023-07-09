<script setup>
const url = 'https://www.boredapi.com/api/activity'
const { pending, data: activity } = useFetch(url)
</script>
<template>
    <v-card class="pa-3 my-5 rounded" width="500px">
        <template v-if="pending">
            <v-card-title class="text-capitalize bg-blue-lighten-1 rounded">
                <v-progress-circular class="text-blue-lighten-1" size="small" indeterminate></v-progress-circular>
            </v-card-title>
            <v-card-text class="pt-5">
                <v-progress-circular class="text-blue-lighten-1" size="small" indeterminate></v-progress-circular>
            </v-card-text>
        </template>
        <template v-else>
            <v-card-title class="text-capitalize bg-blue-lighten-1 rounded">
                {{ activity.type }}
            </v-card-title>
            <v-card-text class="pt-5">
                {{ activity.activity }}.
            </v-card-text>
    </template>
    </v-card>
</template>