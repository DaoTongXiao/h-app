import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // 开发阶段启用源码映射：https://uniapp.dcloud.net.cn/tutorial/migration-to-vue3.html#需主动开启-sourcemap
    sourcemap: process.env.NODE_ENV === 'development',
  },
  plugins: [uni()],
  css: {
    preprocessorOptions: {
      scss: {
        // 抑制 color.mix 弃用警告
        quietDeps: true,
        logger: {
          warn(message: string) {
            // 过滤掉 color.mix 弃用警告
            if (
              message.includes('Global built-in functions are deprecated') ||
              message.includes('Use color.mix instead')
            ) {
              return
            }
            console.warn(message)
          },
        },
      },
    },
  },
})
