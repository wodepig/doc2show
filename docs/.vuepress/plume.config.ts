import { defineThemeConfig } from 'vuepress-theme-plume'
import navbar from './navbar'

export default defineThemeConfig({
    // 在这里配置主题
    autoFrontmatter:{
    },
    // 加密除了前10章的内容
    encrypt:{
        global: false,
        admin: ['57485','xxdlovo'],
        rules: {
            '^.*?/[1-9][0-9].*': '57485'
        }

    },
    profile: {
        name: 'Your name',
    },
    navbar: [
        { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
        { text: 'nuxt3全栈', link: '/nuxt3/', icon: 'logos:nuxt-icon' },
        { text: '现代web布局', link: '/ModernWebLayout/', icon: 'devicon:webpack' },
    ],
    // home: '/notes/home.md',
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
})
