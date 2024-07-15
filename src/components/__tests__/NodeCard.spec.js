import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import NodeCard from '../NodeCard.vue'

describe('NodeCard', () => {
  it('disaplys node name and description', () => {
    const wrapper = mount(NodeCard, { 
      props: { 
        node: {
          data: {name: 'Node name', description: 'Node description'}
        }
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    expect(wrapper.text()).toContain('Node name')
    expect(wrapper.text()).toContain('Node description')
  })
  it('emits close event when click Close button', () => {
    const node = {
      data: {name: 'Node name', description: 'Node description'}
    }
    const wrapper = mount(NodeCard, { 
      props: { 
        node
      },
      global: {
        stubs: {
          FontAwesomeIcon: true
        }
      }
    })
    wrapper.find('button[title="Close"]').trigger('click')
    const events = wrapper.emitted()
    expect(events).toHaveProperty('close')
    expect(events['close'][0]).toEqual([node])
  })
})
