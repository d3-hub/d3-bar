# 柱图01

## 说明
- 最简单的柱图
- 柱子透明度随着高度而不同

## 知识点
- 略

## 代码
````html:300
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

<script src="https://d3js.org/d3.v4.min.js"></script>
<script>
  const w = 400
  const h = 200
  const barPadding = 2;  //柱状图之间的间距
  const dataset = [5, 10, 13, 19, 21, 25, 22, 18, 11, 7]

  //1. 创建SVG元素
  const svg = d3.select("body")
    .append("svg")
    .attr("width", w)
    .attr("height", h)


  svg.selectAll("rect")   
    .data(dataset)       
    .enter()              
    .append("rect")
    .attr("x", (d, i) => i * (w / dataset.length))   
    .attr("fill", d => `rgba(200,100,200, ${(d / 25)})`)  // 效果是越高的柱子透明度越大，越明显
    .attr("y", d => h - (d * 4))                          // y轴是朝下的, height也是朝下延伸的
    .attr("width", w / dataset.length - barPadding)       // 柱子的宽度
    .attr("height", d => d * 4)                           // 柱子的高度
</script>
</body>
</html>
````
