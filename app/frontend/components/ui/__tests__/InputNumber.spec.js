import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';

import InputNumber from '../InputNumber.vue';
import InputWarning from '../InputWarning.vue';

const wrapper = shallowMount(InputNumber, {
  props: {
    value: 1133,
    totalDigits: 4,
    error: false,
    errorMessage: 'Please enter 4 digits',
    placeholder: 'Enter any number here',
  },
});

describe('InputNumber', () => {
  it('renders correctly', () => {
    // Checks the initial value & placeholder is rendered correctly
    expect(wrapper.find('input').element.value).toBe('1133');
    expect(wrapper.find('input').attributes('placeholder')).toBe(
        'Enter any number here',
    );
  });
});

describe('formatNumber', () => {
  it('removes all non-digits', async () => {
    // Test 1 to check mixed strings
    await wrapper.find('input').setValue('@1133nhu@ng');
    await wrapper.find('input').trigger('input');

    expect(wrapper.find('input').element.value).toBe('1133');

    // Test 2 to check strings with no digits
    await wrapper.find('input').setValue('@xkeyz');
    await wrapper.find('input').trigger('input');

    expect(wrapper.find('input').element.value).toBe('');
  });

  it('removes all digits after the max total digits', async () => {
    await wrapper.find('input').setValue('113355');
    await wrapper.find('input').trigger('input');

    expect(wrapper.find('input').element.value).toBe('1133');
  });
});

describe('validateErrors', () => {
  it('sets hasErrors to true if the input value is not 4 digits long', async () => {
    await wrapper.find('input').setValue('11');
    await wrapper.find('input').trigger('keydown.enter');

    expect(wrapper.vm.hasErrors).toBe(true);
  });

  it('sets hasErrors to false if the input value is 4 digits long', async () => {
    await wrapper.find('input').setValue('1133');
    await wrapper.find('input').trigger('keydown.enter');

    expect(wrapper.vm.hasErrors).toBe(false);
  });

  it('emits the validated event if hasErrors is false', async () => {
    await wrapper.find('input').setValue('1234');
    await wrapper.find('input').trigger('keydown.enter');

    expect(wrapper.emitted().validated).toBeTruthy();
  });

  it('displays an error message if enter pressed and not validated', async () => {
    await wrapper.find('input').setValue('11');
    await wrapper.find('input').trigger('keydown.enter');

    expect(wrapper.findComponent(InputWarning).exists()).toBe(true);
  });
});

describe('resetNumber', () => {
  it('resets the input value to an empty string', async () => {
    await wrapper.find('input').setValue('1234');
    await wrapper.find('button').trigger('click');

    expect(wrapper.find('input').element.value).toBe('');
  });
});
