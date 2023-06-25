<script setup>
import Isbn13Form from '@/components/form/Isbn13Form.vue';
import LogoMain from '@/components/layout/LogoMain.vue';
</script>

<template>
  <div
    id="body"
    class="bg-blue-100 dark:bg-gray-900 min-h-screen max-w-screen
      flex justify-center items-center"
  >
    <main class="p-4 min-h-[500px] w-full max-w-[500px]">
      <div>
        <LogoMain />
      </div>
      <div>
        <Isbn13Form />
      </div>
    </main>
  </div>
</template>
