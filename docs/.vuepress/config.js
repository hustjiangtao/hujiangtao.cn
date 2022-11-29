/*
* @Author: jiangtao
* @Date:   2018-04-24 22:46:26
* @Last Modified by:   jiangtao
* @Last Modified time: 2018-12-24 14:26:44
*/

const { join, basename, relative } = require('path');
const glob = require('glob');

const generateBlogSideBar = dir => {
  const structure = {};
  const files = glob.sync('**/*.md', { cwd: join(__dirname, '..', dir) })
    .filter(p => basename(p) !== 'README.md')
    .map(p => {
      const [folder, filename] = p.split('/');
      const file = basename(filename, '.md');
      return [folder, file];
    }).forEach(([folder, file]) => {
      structure[folder] = { ...structure[folder] };
      structure[folder][file] = join(dir, folder, file);
    });

  const folders = Object.keys(structure).sort().reverse();

  return [...folders.map(folder => {
    const filenames = Object.keys(structure[folder]).sort().reverse();
    return {
      title: folder,
      collapsable: true,
      children: [].concat(...filenames.map(filename => {
        return [join(folder, filename)]
      }))
    };
  })];
};

module.exports = {
    // base: '/vuepress/',
    // port: 8888,
    evergreen: true,
    // serviceWorker: false,
    // ga: 'UA-123873826-1',
    permalink: "/:year/:month/:slug",

    locales: {
        '/': {
            // lang: 'en-US',
            lang: 'zh-CN',
            // title: 'Jiangtao',
            title: '工作经验分享',
            // description: 'Keep Calm and Carry On',
            description: '规则之内，无不可走之路'
        },
        // '/zh/': {
        //     lang: 'zh-CN',
        //     title: 'Jiangtao',
        //     description: '君子性非异也，善假于物也'
        // }
    },
    head: [
        ['link', { rel: 'icon', href: `/icons/v1/icon-48x48.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `icons/v1/icon-512x512.png` }],
        // ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/v1/icon-512x512.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    themeConfig: {
        // repo: 'hustjiangtao/vuepress',
        // editLinks: true,
        // docsDir: 'docs',
        logo: 'https://static.hujiangtao.cn/image/2019/06/logo.jpg',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                // editLinkText: 'Edit this page',
                lastUpdated: 'Last Updated',
                nav: [
                    {
                        text: 'Home',
                        link: '/'
                    },
                    {
                        text: 'Blog',
                        link: '/post/'
                    },
                    {
                        text: 'Gist',
                        link: '/gist/'
                    },
                    {
                        text: 'About',
                        link: '/about'
                    },
                    {
                        text: 'Contact',
                        link: '/contact'
                    },
                ],
                sidebar: {
                    '/post/': [
                        ...generateBlogSideBar('/post'),
                        ],
                    '/gist/': [
                        ...generateBlogSideBar('/gist'),
                        ],
                },
                // search: false,
                // searchMaxSuggestions: 10,
            },
            // '/zh/': {
            //     label: '简体中文',
            //     selectText: '选择语言',
            //     // editLinkText: '编辑此页',
            //     lastUpdated: '上次更新',
            //     nav: [
            //         {
            //             text: '主页',
            //             link: '/zh/index'
            //         },
            //         {
            //             text: '文章',
            //             link: '/zh/post/'
            //         },
            //         {
            //             text: '关于',
            //             link: '/zh/about'
            //         },
            //         {
            //             text: '联系我',
            //             link: '/zh/contact'
            //         },
            //     ],
            //     sidebar: {
            //         '/zh/post/': [
            //             ...generateBlogSideBar('/zh/post'),
            //             ],
            //     },
            // }
        },
        sidebarDepth: 2,
        // displayAllHeaders: true,
        // algolia: {
        //     apiKey: '5eb22bc026c0550c84b1b1bd23ea2139',
        //     indexName: 'hujiangtao'
        // },
        // serviceWorker: {
        //     updatePopup: true,  // refresh button when serviceWorker
        // },
    },
    // markdown: {
    //     // lineNumbers: true,
    //     config: md => {
    //         md.use(require('markdown-it-deflist'))
    //           .use(require('markdown-it-task-lists'))
    //     }
    // },
    plugins: {
        '@vuepress/google-analytics': {
            ga: 'UA-123873826-1'
        },
        '@vuepress/pwa': {
            serviceWorker: false
        },
        '@vuepress/back-to-top': true,
        'sitemap': {
            hostname: 'https://www.webppx.com',
            exclude: [
                '/404.html',
                '/404/',
                '/1970/01/_404/',
                '/about.html',
                '/about/',
                '/contact.html',
                '/contact/',
                '/zh/about.html',
                '/zh/about/',
                '/zh/contact.html',
                '/zh/contact/',
            ]
        },
        '@vuepress/last-updated': {
            transformer: (timestamp, lang) => {
                return new Date(timestamp).toLocaleString(lang, {hourCycle: 'h24'})
            }
        },
    },
    markdown: {
        extendMarkdown: md => {
            md.use(require('markdown-it-deflist'))
              .use(require('markdown-it-task-lists'))
        }
    }
}
