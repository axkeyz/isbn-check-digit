<script setup>
import LogoIcon from '@/components/layout/LogoIcon.vue';
</script>

<template>
    <div
        class="text-blue-900 dark:text-blue-300
        my-6 flex justify-center md:justify-start"
    >
        <div class="hidden w-full md:flex md:max-w-[100px]">
            <LogoIcon />
        </div>
        <div
            class="font-merriweather h-full
            flex flex-col justify-center px-4 my-auto"
        >
            <div class="text-4xl mb-2 text-center md:text-left">
                ISBN13
            </div>
            <div class="text-md text-center md:text-left">
                Calculate any ISBN13 check digit!
            </div>
        </div>
    </div>
</template>
