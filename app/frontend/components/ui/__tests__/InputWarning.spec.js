import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import InputWarning from '../InputWarning.vue';

describe('InputWarning', () => {
  it('renders the label with the provided text', () => {
    const labelText = 'Hello, World!';
    const wrapper = shallowMount(InputWarning, {
      slots: {
        default: labelText,
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(labelText);
  });
});
