# 柱图03

## 说明
- 带事件绑定的柱图(hove柱子高亮)


## 知识点
- `d3.axisLeft().scale(yAxisScale)` 写法等同于 `d3.axisLeft(yAxisScale)`
- `chart.transition()` 动画可以分开来写
- `d3.scaleLinear().domain` 可以指定类似`[1,3,5,7]`(用于颜色比例尺)
- `d3.event.target` 可以获得当前鼠标位置所在的dom
- `d3.color(d3.event.target.style.fill).brighter(1.5))` 获取颜色并且获得高亮颜色

## 代码
````html:300
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

<div class="someclass">
    <div id="bar-chart">
    </div>
</div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script>

  const chartdata = [
    40, 60, 80, 100, 70, 120,
    100, 60, 70, 150, 120, 140,
    80, 100, 70, 120, 100, 60, 70
  ]

  const margin = { top: 60, right: 20, bottom: 30, left: 35 }

  const height = 300
  const width = 720
  const chartHeight = height - margin.top - margin.bottom
  const chartWidth = width - margin.left - margin.right

  // y轴比例尺
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(chartdata)])
    .range([chartHeight, 0])

  // x轴比例尺
  const xScale = d3.scaleBand() // 创建序数段比例尺
    .domain(d3.range(0, chartdata.length)) // => [1,2,3,4 ....]
    .padding(0.5)
    .range([0, chartWidth])

  // 颜色比例尺
  const colors = d3.scaleLinear()
    .domain([0, chartdata.length * .33, chartdata.length * .66, chartdata.length])
    .range(['#00A1CB', '#D0D102', '#F18D05', '#D70060'])

  // 1. 添加svg
  const svg = d3.select('#bar-chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', '#67CDDC')

  /********************  render 柱图 ******************/

  // 2. 添加柱状图容器g
  const chart = svg.append('g')
    .attr('class', 'bar-container')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .selectAll('rect')
    .data(chartdata)
    .enter()
    .append('rect')
    .attr('width', xScale.bandwidth())
    .attr('x', (d, i) => xScale(i))
    .attr('height', 0)
    .attr('y', chartHeight)
    .style('fill', (d, i) => colors(i))
    .style('stroke', d3.color('#00A9E0').darker(.6))
    .style('stroke-width', 2)
    .on('mouseover', (d,i) => {
        const {target} = d3.event
        d3.select(target).style('fill', d3.color(target.style.fill).brighter(1.5))
    })
    .on('mouseout', (d,i) => {
        const { target } = d3.event
        d3.select(target).style('fill', colors(i))
    })

  // 设置动画（可以分开设置）
  chart.transition()
    .attr('height', (d) => chartHeight - yScale(d))
    .attr('y', d => yScale(d))
    .delay((d, i) => i * 20)
    .duration(650)
    .ease(d3.easeSinIn)

  /********************  render x坐标轴 ******************/

  // 这种写法等价于 d3.axisBottom(xScale)
  const xAxis = d3.axisBottom().scale(xScale)

  svg.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(xAxis)

  /********************  render y坐标轴 ******************/

  const yAxis = d3.axisLeft().scale(yScale)

  svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', 20)
    .style('font-size', 20)
    .style('fill', 'white')
    .text('chartdata')

  /********************  render 标题 ******************/

  svg.append('text')
    .attr('x', width / 2)
    .attr('y', margin.top / 2)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Calibri')
    .style('font-size', 30)
    .style('fill', 'white')
    .text('Title')
</script>
</body>
</html>
````
