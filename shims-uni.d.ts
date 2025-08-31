/// <reference types='@dcloudio/types' />
/// <reference types='@uni-helper/uni-app-types' />
/// <reference types='@uni-helper/uni-ui-types' />
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $app: App.AppInstance
    $page: Page.PageInstance
  }
}

declare module '@vue/runtime-core' {
  type Hooks = App.AppInstance & Page.PageInstance

  interface ComponentCustomOptions extends Hooks {}
}
