import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    title:'筱筱的文档站',
    bundler: viteBundler(),
    theme: defaultTheme(),
})