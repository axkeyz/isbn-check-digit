import {describe, it, expect} from 'vitest';
import {shallowMount} from '@vue/test-utils';
import MessageAlert from '../MessageAlert.vue';

describe('MessageAlert', () => {
  it('renders styles correctly with default props', () => {
    const wrapper = shallowMount(MessageAlert);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.p-4').exists()).toBe(true);
    expect(wrapper.find('.p-4').classes()).not.toContain('bg-red-500/10');
    expect(wrapper.find('.p-4').classes()).not.toContain('dark:bg-red-900/70');
    expect(wrapper.find('.p-4').classes()).not.toContain('bg-green-500/10');
    expect(wrapper.find('.p-4').classes()).not.toContain('dark:bg-green-900/70');
    expect(wrapper.find('.p-4').text()).toBe('');
  });

  it('renders styles correctly when status prop = success', () => {
    const wrapper = shallowMount(MessageAlert, {
      props: {
        status: 'success',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.p-4').exists()).toBe(true);
    expect(wrapper.find('.p-4').classes()).toContain('bg-green-500/10');
    expect(wrapper.find('.p-4').classes()).toContain('dark:bg-green-900/70');
    expect(wrapper.find('.p-4').classes()).not.toContain('bg-red-500/10');
    expect(wrapper.find('.p-4').classes()).not.toContain('dark:bg-red-900/70');
  });

  it('renders styles correctly when status prop = error', () => {
    const wrapper = shallowMount(MessageAlert, {
      props: {
        status: 'error',
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.p-4').exists()).toBe(true);
    expect(wrapper.find('.p-4').classes()).not.toContain('bg-green-500/10');
    expect(wrapper.find('.p-4').classes()).not.toContain('dark:bg-green-900/70');
    expect(wrapper.find('.p-4').classes()).toContain('bg-red-500/10');
    expect(wrapper.find('.p-4').classes()).toContain('dark:bg-red-900/70');
  });
});
