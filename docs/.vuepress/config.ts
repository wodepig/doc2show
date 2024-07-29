import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
// @ts-ignore
import { recoTheme } from 'vuepress-theme-reco'

export const navbar = [
    { text: '指南', link: '/vuepress-theme-reco/', icon: 'Compass' },
    { text: 'nuxt3', link: '/docs/nuxt3', icon: 'Compass' },
    { text: 'nuxt3', link: '/nuxt3/', icon: 'Compass' },
    {
        text: '参考',
        icon: 'Document',
        children: [
            {
                text: '配置',
                children: [
                    { text: '主题配置', link: '/docs/theme/frontmatter' },
                    { text: 'Markdown 扩展', link: '/docs/theme/custom-container' },
                    { text: '高级', link: '/docs/theme/custom-catalog-title' },
                ],
            },
            {
                text: '插件',
                children: [
                    { text: 'page', link: '/docs/plugins/page' },
                    { text: 'comments', link: '/docs/plugins/comments' },
                    { text: 'vue-previews', link: '/docs/plugins/vue-previews' },
                    { text: 'bulletin-popover', link: '/docs/plugins/bulletin-popover' },
                ],
            },
        ],
    },
    {
        text: '版本',
        icon: 'SubVolume',
        children: [
            { text: '2.x(alpha)', link: 'https://vuepress-theme-reco.recoluan.com/' },
            {
                text: '1.x',
                link: 'https://vuepress-theme-reco.recoluan.com/views/1.x/',
            },
        ],
    },
    { text: '留言板', link: '/docs/message-board', icon: 'Chat' },
]

export default defineUserConfig({
    lang: 'zh-CN',
    title:'筱筱的文档站',
    bundler: viteBundler(),
    theme: plumeTheme({
        navbar: [
            { text: '首页', link: '/', icon: 'material-symbols:home-outline' },
            { text: 'nuxt3全栈', link: '/nuxt3/', icon: 'material-symbols:article-outline' },
            { text: '现代web布局', link: '/ModernWebLayout/', icon: 'material-symbols:article-outline' },
        ],
        notes: {
            dir: '/notes/', // 声明所有笔记的目录
            link: '/', // 声明所有笔记默认的链接前缀， 默认为 '/'
            notes: [
                {
                    dir: 'nuxt3', // 声明笔记的目录，相对于 `notes.dir`
                    link: '/nuxt3/', // 声明笔记的链接前缀
                    sidebar: [ // 配置侧边栏
                        {
                            text: '简介',
                            icon: 'mdi:language-typescript', // 侧边栏图标
                            items: "auto" // 简化写法，主题会自动补全为 `foo.md`
                        }
                    ]
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

