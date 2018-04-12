# 柱图04

## 说明
- 动态更新，过渡动画
- 有点没看懂


## 知识点
- `d3.shuffle` 数组随机排序
- `tween` 使用自定义插值器过渡样式
- `d3.interval` 一个可配置时期的定时器

## 代码
````html:250
<!doctype html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>Document</title>
</head>
<body>
<div class='chart'></div>
<script src='https://d3js.org/d3.v4.min.js'></script>
<script>
  const DATA = [10, 20, 40, 70, 50, 30, 90, 120, 5, 65, 75]

  const WIDTH = 400
  const HEIGHT = 200
  const INNER_HEIGHT = HEIGHT - 20
  const BAR_WIDTH = 24
  const BAR_GAP = 2  // 矩形间的间隔

  // 对数据重新排序
  function preprocess(data) {
    return d3.shuffle(data).map((d, i) => ({ id: i, value: d }))
  }

  // 比例尺
  const scale = d3.scaleLinear()
    .domain([0, d3.max(DATA)])
    .range([0, INNER_HEIGHT])

  // 高度值
  function y(d) {
    return HEIGHT - scale(d.value)
  }

  function height(d) {
    return scale(d.value)
  }

  const svg = d3.select('body').append('svg')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .append('g')

  function update(data) {
    const t = d3.transition()
      .duration(750)

    const bar = svg.selectAll('g')
        .data(data, d => d.id)

    // 获得退出（exit）选择器（元素无数据, 并且删除节点
    bar.exit().remove()

    // 更新每个g的位置
    bar.transition(t)
      .attr('transform', (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)}, ${y(d)})`)

    // 更新每个rect的高度
    bar.select('rect')
      .transition(t)
      .attr('height', height)

    // 对柱子上的数字做一个变换动画
    bar.select('text')
      .transition(t)
      .tween('text', function(d) {             // 在过渡期间运行自定义代码
        const v0 = this.textContent || '0'     // 旧的值
        const v1 = d.value                     // 新传入的值
        const i = d3.interpolateRound(v0, v1)  // 插补整数
        return t => this.textContent = i(t)    // 意思大概是根据时间值，时时的变化数字
      })

    // 给数据赋予g元素
    const barEnter = bar
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${INNER_HEIGHT})`)

    barEnter
      .transition(t)
      .attr('transform', (d, i) => `translate(${i * (BAR_WIDTH + BAR_GAP)},${y(d)})`)

    const rect = barEnter.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', BAR_WIDTH)
      .attr('height', 0)

    rect
      .transition(t)
      .attr('height', height)

    const text = barEnter.append('text')
      .text(d => d.value)
      .attr('text-anchor', 'middle')
      .attr('dx', BAR_WIDTH / 2)
      .attr('dy', -2)
  }

  d3.interval(() => {
    update(preprocess(DATA))
  }, 2000)
</script>
</body>
</html>
````
