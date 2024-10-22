import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Курсы ВФ ВолГУ",
    description: "Материалы по различным курсам колледжа",

    outDir: 'dist',

    themeConfig: {
        outline: {
            level: [1, 3],
        },

        // https://vitepress.dev/reference/default-theme-config
        nav: [
            { text: 'Курсы', link: '/cources' },
        ],

        search: {
            provider: 'local',
        },

        sidebar: [
            {
                text: 'Курсы',
                link: '/cources',
                items: [
                    {
                        text: 'Системное программирование',
                        base: '/system-programming',
                        link: '/',
                        items: [
                            { text: 'Практика 1', link: '/practice-1' },
                            { text: 'Практика 2', link: '/practice-2' },
                            { text: 'Практика 3', link: '/practice-3' },
                            { text: 'Практика 4', link: '/practice-4' },
                            { text: 'Практика 5', link: '/practice-5' },
                        ],
                    },
                    // {
                    //     text: 'Компьютерное 3D моделирование',
                    // },
                    // {
                    //     text: 'Инструментальные средства разработки программного обеспечения'
                    // }
                ],
            },
        ],

        footer: {
            copyright: 'Тимур Токаев (@toombez) 2024-н.в.',
            message: 'Опубликовано под лицензией MIT',
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/toombez/volsu-tokaev-materials' },
        ],
    },

    markdown: {
        math: true
    },

    lang: 'ru-RU',
})
