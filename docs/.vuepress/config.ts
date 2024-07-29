import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
// @ts-ignore
import { recoTheme } from 'vuepress-theme-reco'


export default defineUserConfig({
    lang: 'zh-CN',
    title:'筱筱的文档站',
    bundler: viteBundler(),
    theme: plumeTheme({
        plugins:{
            shiki:{
                languages: ['javascript','vue','shell','vue-html','bash', 'sh']
            }
        },
        navbar: [
            { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
            { text: 'nuxt3全栈', link: '/nuxt3/', icon: 'logos:nuxt-icon' },
            { text: '现代web布局', link: '/ModernWebLayout/', icon: 'devicon:webpack' },
        ],
        notes: {
            dir: '/notes/', // 声明所有笔记的目录
            link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
            notes: [
                {
                    dir: 'nuxt3', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/nuxt3/', // 声明笔记的链接前缀
                    sidebar: "auto"
                },
                {
                    dir: 'ModernWebLayout',
                    link: '/ModernWebLayout/',
                    sidebar: "auto"
                }
            ]
        }
    } ),
})

