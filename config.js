const demos = [
  { title: '总览', path: '/demo/overview'},
  { title: '柱图03', path: '/demo/bar-03'},
  { title: '柱图02', path: '/demo/bar-02'},
  { title: '柱图01', path: '/demo/bar-01'},
]

docute.init({
  landing: 'landing.html',
  // announcement(route) {
  //   const info = { type: 'warning' }
  //   info.html = '<a style="margin-right:10px;" class="docute-button docute-button-mini docute-button-warning" href="https://github.com/egoist/donate" target="_blank">注意!</a> 图表还处于开发阶段，所以文档还在剧烈变动阶段.'
  //   return info
  // },
  debug: true,
  // home: 'https://raw.githubusercontent.com/egoist/docute/master/README.md',
  repo: 'd3-hub/d3-bar',
  tocVisibleDepth: 4,
  nav: {
    default: [
      {title: '主页', path: '/home'},
      {title: 'API文档', path: '/api'},
      {title: '案例', path: '/case', type: 'dropdown', items: demos},
    ]
  },
  plugins: [
    docuteIframe(),
    docsearch({
      apiKey: '65360cf9a91d87cd455d2b286d0d89ee',
      indexName: 'docute',
      // tags: ['english', 'zh-Hans', 'zh-Hant', 'ja'],
      tags: ['changelog', 'chart'],
      url: 'https://docute.js.org'
    }),
    evanyou()
  ]
})
