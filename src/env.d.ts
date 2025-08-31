/// <reference types="vite/client" />
/// <reference types="@uni-helper/uni-types" />
/// <reference types="@dcloudio/types" />

export {}
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
  export interface GlobalComponents {
    view: DefineComponent<{ class?: string }>
    text: DefineComponent<{ class?: string }>
    // 你需要的其他 uni-app 组件都可以加进来
  }
}
