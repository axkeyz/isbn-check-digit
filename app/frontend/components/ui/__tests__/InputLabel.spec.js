import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import InputLabel from '../InputLabel.vue';

describe('InputLabel', () => {
  it('renders with the provided label text', () => {
    const labelText = 'Hello, World!';

    const wrapper = shallowMount(InputLabel, {
      slots: {
        default: labelText,
      },
    });

    // Checks that the label exists and the set text is correct
    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe(labelText);
  });
});
