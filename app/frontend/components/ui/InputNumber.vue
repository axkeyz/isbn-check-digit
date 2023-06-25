<script setup>
import {ref, watch} from 'vue';
import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import InputWarning from '@/components/ui/InputWarning.vue';

const props = defineProps({
  value: Number,
  totalDigits: Number,
  error: Boolean,
  errorMessage: String,
  placeholder: String,
});

const emit = defineEmits(['update:modelValue', 'validated']);

const number = ref(props.value);
const warning = ref(props.errorMessage);
const hasErrors = ref(props.error);
const hasChanged = ref(false);

watch(number, async (newVal) => {
  hasChanged.value = true;
  emit('update:modelValue', newVal);

  if (number.value.length == props.totalDigits) {
    validateErrors();
  }
});

/**
 * Formats the number
 */
function formatNumber() {
  // Removes all non-digits
  number.value = number.value.replace(/[^0-9]/g, '');

  // Removes all digits after the max total digits
  if (number.value.length > props.totalDigits) {
    number.value = number.value.slice(0, props.totalDigits);
  }
}

/**
 * Checks for any errors
 */
function validateErrors() {
  if (hasChanged.value) {
    hasErrors.value = number.value.length != props.totalDigits;

    if (! hasErrors.value) {
      emit('validated');
    }

    hasChanged.value = false;
  }
}

/**
 * Resets this component.
 */
function resetNumber() {
  number.value = '';
}

</script>

<template>
    <div class="relative">
      <input
        type="text"
        class="bg-white/50 dark:bg-black/50
        text-black dark:text-blue-100 border px-4 py-2 w-full
        focus:outline-none focus:ring hover:ring active:ring"
        :class="{
          'border-red-500 ring ring-red-500/40': hasErrors,
          'border-blue-500 hover:ring-blue-500/40': !hasErrors,
          'focus:ring-blue-500/40 active:ring-blue-500/40': !hasErrors,
        }"
        v-model="number"
        @input="formatNumber"
        @keydown.enter.prevent="validateErrors"
        :placeholder=props.placeholder
      />
      <button
        class="absolute top-0 right-0 h-full
         text-blue-900 dark:text-blue-500/80 hover:text-blue-300"
        type="button"
        @click="resetNumber"
      >
        <div class="w-6 h-6 mx-2 my-auto">
          <DeleteIcon />
        </div>
      </button>
    </div>
    <InputWarning class="pt-2" v-if="hasErrors">{{ warning }}</InputWarning>
</template>

