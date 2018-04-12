# 柱图02

## 说明
- 最基本的柱图

## 知识点
- `tickSizeInner` 设置内刻度的大小
- `tickPadding` 设置刻度和标签之间的间距

## 代码
````html:400
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        .bar-line {
            fill: #F38630;
        }
        .domain,
        .tick,
        .tick line {
            stroke: #62D2E7;
        }
    </style>
</head>
<body>

<div id="chartContainer"></div>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script>
  // 定义数据
  const data = [
    { value: 99, label: 'Mon' },
    { value: 63, label: 'Tues' },
    { value: 41, label: 'Wed' },
    { value: 100, label: 'Thur' },
    { value: 50, label: 'Fri' },
    { value: 23, label: 'Sat' },
    { value: 8, label: 'Sun' }
  ];

  // 定义参数值
  const dimensions = {
    gWidth: 600,
    gHeight: 400,
    gMargin: 40,
    gInnerWidth: 520,
    gInnerHeight: 320,
    bMargin: 10
  }

  const barWidth = (dimensions.gInnerWidth / data.length) - (dimensions.bMargin * 2 )
  const maxValue = d3.max(data, d => d.value) // 获取y轴最大值


  /********************  render y坐标轴 ******************/

  // 定义y轴比例尺

  const yScale = d3.scaleLinear()
    .domain([maxValue, 0])
    .range([0, dimensions.gInnerHeight])

  const yAxis =  d3.axisLeft(yScale)
    .tickSizeInner(-dimensions.gInnerWidth)  //y轴贯穿线
    .tickPadding(10)  // y轴刻度文字距离Y轴的距离

  const chart = d3.select('#chartContainer')
    .append('svg')
    .attr('width', dimensions.gWidth)
    .attr('height', dimensions.gHeight)

  chart.append('g')
    .attr('class', 'axis y-axis')
    .attr('transform', `translate(${dimensions.gMargin}, ${dimensions.gMargin})`)
    .call(yAxis)

  /********************  render x坐标轴 ******************/

  // 定义x轴比例尺
  const xScale = d3.scaleLinear()
    .domain ([0, data.length])
    .range([0, dimensions.gInnerWidth])

  // 底部轴生成器
  const xAxis = d3.axisBottom(xScale)
    .tickValues(data.map((item,i) => i + 0.5))
    .tickFormat((d, i) => data[i].label); // 可以 格式化刻度值

  chart.append('g')
    .attr('class', 'axis x-axis')
    .attr('transform', `translate(${dimensions.gMargin}, ${dimensions.gMargin + dimensions.gInnerHeight})`)
    .call(xAxis)

  /********************  render 矩形柱子 ******************/

  chart.append('g')
    .attr('class', 'bar-container')
    .attr('transform', `translate(${dimensions.gMargin}, ${dimensions.gMargin})`)  // 偏移g元素
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .classed('bar-line', true)
    .attr('x', (d, i) => (dimensions.gInnerWidth / data.length) * i + dimensions.bMargin)
    .attr('y', (d, i) => yScale(d.value))
    .attr('width', barWidth)
    .attr('height', (d, i) =>dimensions.gInnerHeight -  yScale(d.value))

</script>
</body>
</html>
````
