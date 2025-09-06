export {}

declare module 'vue' {
  type Hooks = App.AppInstance & Page.PageInstance
  interface ComponentCustomOptions extends Hooks {}
}

declare global {
  const uni: Uni
  interface Uni {
    navigateTo(options: UniNamespace.NavigateToOptions): void
    switchTab(options: UniNamespace.SwitchTabOptions): void
    reLaunch(options: UniNamespace.ReLaunchOptions): void
    showToast(options: UniNamespace.ShowToastOptions): void
    // Add other uni APIs as needed
  }
}
