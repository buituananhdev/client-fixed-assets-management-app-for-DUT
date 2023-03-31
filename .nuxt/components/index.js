export { default as AssetItem } from '../..\\components\\Asset\\assetItem.vue'
export { default as AssetCreateAsset } from '../..\\components\\Asset\\CreateAsset.vue'
export { default as NotificationsNotification } from '../..\\components\\Notifications\\Notification.vue'
export { default as NotificationsPopUp } from '../..\\components\\Notifications\\PopUp.vue'
export { default as NotificationsTooltip } from '../..\\components\\Notifications\\Tooltip.vue'
export { default as LayoutsFooter } from '../..\\components\\Layouts\\Footer.vue'
export { default as LayoutsHeader } from '../..\\components\\Layouts\\Header.vue'
export { default as LayoutsNavigationBar } from '../..\\components\\Layouts\\NavigationBar.vue'
export { default as LayoutsTabLeft } from '../..\\components\\Layouts\\TabLeft.vue'
export { default as SelectBox } from '../..\\components\\SelectBox\\SelectBox.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
