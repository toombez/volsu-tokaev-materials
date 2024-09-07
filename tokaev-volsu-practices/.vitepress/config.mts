import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Курсы ВФ ВолГУ",
    description: "Материалы по различным курсам колледжа",
    themeConfig: {
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
})
