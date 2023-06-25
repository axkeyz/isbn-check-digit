<script setup>
import {ref} from 'vue';

import {isbn13} from '@/api/BarcodeApi.js';
import {replaceISBNSubstrings} from '@/utils/StringUtils.js';

import MessageAlert from '@/components/ui/MessageAlert.vue';
import InputNumber from '@/components/ui/InputNumber.vue';
import InputLabel from '@/components/ui/InputLabel.vue';

const message = ref('');
const hasErrors = ref(false);
const errorMessage = `ISBN13 must be ${isbn13.totalDigits} digits`;

/**
 * Sets the default message.
 */
function resetValues() {
  message.value = '';
  hasErrors.value = true;
}

/**
 * Sets the message and updates the errors.
 */
async function setValidatedValues() {
  try {
    const data = await isbn13.withCheckDigit();

    if (data.error) {
      throw new Error(replaceISBNSubstrings(data.error));
    }

    message.value = `ISBN13 with check digit is ${data.result}`;

    hasErrors.value = false;
  } catch (err) {
    message.value = err.message;
  }
}

</script>

<template>
    <form
      class="flex flex-col gap-4"
      @submit.prevent="setValidatedValues"
    >
      <div class="flex gap-2 flex-col md:flex-row">
        <div class="w-full">
          <InputLabel for="isbn" class="mb-2">
            ISBN13 Number
          </InputLabel>
          <InputNumber
            id="isbn" name="isbn"
            class="w-full max-w-lg"
            :totalDigits="isbn13.totalDigits"
            placeholder="Enter any ISBN13 Number"
            v-model="isbn13.isbn"
            @update:modelValue="resetValues"
            @validated="setValidatedValues"
            :errorMessage="errorMessage"
            :error="hasErrors"
          />
        </div>
      </div>
      <MessageAlert
        :status="hasErrors ? 'error' : 'success'"
        v-if="message.length"
      >
        <template #message>
          {{ message }}
        </template>
      </MessageAlert>
    </form>
</template>
