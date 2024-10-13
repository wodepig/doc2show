import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { plumeTheme } from 'vuepress-theme-plume'
import { watermarkPlugin } from '@vuepress/plugin-watermark'
// @ts-ignore
import { recoTheme } from 'vuepress-theme-reco'


export default defineUserConfig({
    lang: 'zh-CN',
    title:'筱筱的文档站',
    base: '/doc2show/',
    bundler: viteBundler(),
    plugins:[
        watermarkPlugin({
            enabled: true,
        }),
    ],
    theme: plumeTheme({

        plugins:{
            shiki:{
                languages: ['javascript','vue','shell','vue-html','bash', 'sh']
            }
        },

    } ),
})

