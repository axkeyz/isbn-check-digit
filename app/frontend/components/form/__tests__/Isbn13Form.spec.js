import {vi, describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';

import Isbn13Form from '../Isbn13Form.vue';
import MessageAlert from '@/components/ui/MessageAlert.vue';
import InputNumber from '@/components/ui/InputNumber.vue';
import InputLabel from '@/components/ui/InputLabel.vue';

const wrapper = shallowMount(Isbn13Form);

describe('Isbn13Form', () => {
  it('renders correctly', () => {
    expect(wrapper.findComponent(InputNumber).exists()).toBe(true);
    expect(wrapper.findComponent(InputLabel).exists()).toBe(true);
    expect(wrapper.findComponent(MessageAlert).exists()).toBe(false);
  });

  it('should return validated values when the form is submitted', async () => {
    const form = wrapper.find('form');
    const input = wrapper.findComponent(InputNumber);

    // Mock the API response
    const mockData = {
      result: '1234567890128',
    };
    vi.spyOn(wrapper.vm.isbn13, 'withCheckDigit').mockResolvedValue(mockData);

    await input.setValue('123456789012');
    await form.trigger('submit.prevent');

    expect(wrapper.vm.message).toBe('ISBN13 with check digit is 1234567890128');
    expect(wrapper.vm.hasErrors).toBe(false);
  });

  it('should return error message when the form with invalid values is submitted', async () => {
    const form = wrapper.find('form');
    const input = wrapper.findComponent(InputNumber);

    // Mock the API response
    const mockData = {
      error: 'Isbn is the wrong length (should be 12 characters)',
    };
    vi.spyOn(wrapper.vm.isbn13, 'withCheckDigit').mockResolvedValue(mockData);

    // Set input value as an invalid value
    await input.setValue('23448');
    await form.trigger('submit.prevent');

    expect(wrapper.vm.message).toBe('');
    expect(wrapper.vm.hasErrors).toBe(true);
  });
});

describe('resetValues', () => {
  it('should reset the message & hasErrors when InputNumber is updated', async () => {
    await wrapper.findComponent(InputNumber).setValue('@1133nhu@ng');

    expect(wrapper.vm.message).toBe('');
    expect(wrapper.vm.hasErrors).toBe(true);
  });
});
