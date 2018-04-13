# 柱图06

## 说明
- 支持数据更新, class方式, 样式新颖
- 源码地址：[codepen](https://codepen.io/marcobiedermann/pen/NRVdNZ)

## 知识点


## 代码
````html:450
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .align {
            align-items: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        :root {
            --bodyFontFamily: sans-serif;
            --bodyLineHeight: 1.5;
        }

        :root {
            --chartMarginBottom: 1.5rem;
            --chartBarColor: #f32a64;
            --chartColumnColor: #e6edf4;
            --chartAxisColor: #e6edf4;
            --chartAxisFontSize: 0.625rem;
            --chartAxisStrokeWidth: 0.125rem;
        }

        .chart {
            margin-bottom: var(--chartMarginBottom);
        }

        .chart__bar {
            fill: var(--chartBarColor);
        }

        .chart__column {
            fill: var(--chartColumnColor);
        }

        .chart__axis {
            font-size: var(--chartAxisFontSize);
        }

        .chart__axis path,
        .chart__axis line {
            fill: none;
            stroke: var(--chartAxisColor);
            stroke-width: var(--chartAxisStrokeWidth);
        }

        .chart__axis path {
            display: none;
        }

        /* modules/image.css */

        svg {
            height: auto;
            max-width: 100%;
            vertical-align: middle;
        }

    </style>
</head>
<body class="align">

<h2>Bar Chart</h2>
<div class="chart chart--bar-chart js-bar-chart"></div>

<button class="js-bar-chart-update">Update</button>

<!--源码地址：https://codepen.io/marcobiedermann/pen/NRVdNZ -->
<script src='https://d3js.org/d3.v4.min.js'></script>
<script>
  const defaults = {
    width : 500,
    height: 300,
    margin: {
      top   : 15,
      right : 0,
      bottom: 35,
      left  : 60
    },
    axis: true,
    axisPadding: 5,
    tickSize: 10,
    barPadding: 10,
    ease: d3.easeLinear,
    nice: true,
    type: 'rounded'   // 是否显示圆角
  }

  class BarChart {

    constructor (element, options) {
      Object.assign(this, defaults, options)
      this.element = element
      this.init()
    }

    dimensions() {
      const { margin } = this

      return [
        this.width - margin.left - margin.right,
        this.height - margin.top - margin.bottom
      ]
    }

    init() {
      const { margin, tickSize, axisPadding } = this
      const [ innerWidth, innerHeight ] = this.dimensions()

      this.graph = d3.select(this.element)

      const svg = this.svg = this.graph
        .append('svg')
        .attr('width', this.width)
        .attr('height', this.height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      const scaleX = this.scaleX = d3.scaleTime()
        .range([0, innerWidth])

      const scaleY = this.scaleY = d3.scaleLinear()
        .range([innerHeight, 0])

      const xAxis = this.xAxis = d3.axisBottom(scaleX)
        .ticks(5)
        .tickPadding(8)
        .tickSize(tickSize)

      const yAxis = this.yAxis = d3.axisLeft(scaleY)
        .ticks(3)
        .tickPadding(8)
        .tickSize(tickSize)

      /********************  render x轴 ******************/

      svg.append('g')
        .attr('class', 'chart__axis chart__axis--x')
        .attr('transform', `translate(0, ${innerHeight + axisPadding})`)
        .call(xAxis)

      /********************  render y轴 ******************/

      svg.append('g')
        .attr('class', 'chart__axis chart__axis--y')
        .attr('transform', `translate(${-axisPadding}, 0)`)
        .call(yAxis)
    }

    renderAxis(data, options) {
      let { svg } = this;

      svg = options.animate ? svg.transition() : svg;

      svg
        .select('.chart__axis--x')
        .call(this.xAxis);

      svg
        .select('.chart__axis--y')
        .call(this.yAxis);
    }

    renderBars(data, options) {
      const {svg, scaleX, scaleY, barPadding, type, ease} = this
      const [ innerWidth, innerHeight ] = this.dimensions()
      const barWidth = innerWidth / data.length - barPadding

      const column = svg
        .selectAll('.chart__column')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'chart__column');


      (options.animate ? svg.selectAll('.chart__column').transition().ease(ease) : svg.selectAll('.chart__column'))
        .attr('x', data => scaleX(data.date) - barWidth / 2)
        .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
        .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
        .attr('width', barWidth)
        .attr('height', innerHeight)


      column.exit()
        .remove()

      const bar = svg
        .selectAll('.chart__bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'chart__bar')

      // 更新柱图
      let barContainer = svg.selectAll('.chart__bar')
      if (options.animate) {
        barContainer = barContainer.transition().ease(ease)
        // 这里没法这么写barContainer.transition().ease(ease) 这样链式写没有生效
      }
      barContainer
        .attr('x', data => scaleX(data.date) - barWidth / 2)
        .attr('y', data => scaleY(data.value))
        .attr('rx', type === 'rounded' ? barWidth / 2 : 0)
        .attr('ry', type === 'rounded' ? barWidth / 2 : 0)
        .attr('width', barWidth)
        .attr('height', data => innerHeight - scaleY(data.value))

      bar.exit().remove()
    }

    render(data, options = {}) {
      // 更新比例尺的定义域
      const {scaleX, scaleY} = this
      const domainX = scaleX.domain(d3.extent(data, d => d.date))
      const domainY = scaleY.domain([0, d3.max(data, d => d.value)])

      if (this.nice) {
        domainX.nice()
        domainY.nice()
      }

      // 这个配置应该是是否更新坐标轴
      if (this.axis) {
        this.renderAxis(data, options)
      }

      // 更新柱图
      this.renderBars(data, options)
    }

    update(data, options) {
      this.render(data, {
        animate: true
      });
    }

  }

  function generateData(n) {
    const data = [];

    while (n--) {
      data.push({
        date: new Date(Date.now() - (n * 1000 * 60 * 60 * 24)),
        value: generateRandomInteger(0, 12)
      });
    }

    return data;
  }

  function generateRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // 初始化, render x轴 / y轴
  const barChart = new BarChart('.js-bar-chart')


  barChart.render(generateData(24))

  document.querySelector('.js-bar-chart-update').addEventListener('click', () => barChart.update(generateData(24)))
</script>
</body>
</html>
````
