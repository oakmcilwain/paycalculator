<template>
    <v-app>
        <v-layout>
            <AppHeader />
            <v-main>
                <slot />
            </v-main>
            <AppFooter />
        </v-layout>
    </v-app>
</template>