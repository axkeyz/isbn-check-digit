<script setup>

defineProps({
  status: {
    type: String,
    default: 'none',
    validator(value) {
      return [
        'none',
        'success',
        'error',
      ].includes(value);
    },
  },
  disabled: Boolean,
});
</script>

<template>
    <div
        class="p-4"
        :class="{
          'text-red-800 dark:text-red-500 \
          bg-red-500/10 dark:bg-red-900/70': status == 'error',
          'text-green-800 dark:text-green-500 \
          bg-green-500/10 dark:bg-green-900/70': status == 'success',
        }"
        v-if="!disabled"
    >
        <slot name="message"></slot>
    </div>
</template>
