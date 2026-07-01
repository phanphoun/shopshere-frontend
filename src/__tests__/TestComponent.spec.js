import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TestComponent from './TestComponent.vue'

describe('TestComponent', () => {
  it('renders default message', () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.find('h1').text()).toBe('Hello')
  })

  it('renders custom message prop', () => {
    const wrapper = mount(TestComponent, { props: { msg: 'ShopSphere' } })
    expect(wrapper.find('h1').text()).toBe('ShopSphere')
  })
})
