# API文档

## 直方图
- `d3.histogram` - 创建一个新的直方图生成器。
- `histogram` - 对给定的样本数组计算直方图。
- `histogram.value` - 为每个样本指定一个值访问器。
- `histogram.domain` - 指定可观测值的间隔。
- `histogram.thresholds` - 指定值划分成不同箱的方法。
- `d3.thresholdFreedmanDiaconis` - Freedman–Diaconis装箱规则。
- `d3.thresholdScott` - Scott’s normal reference装箱规则。
- `d3.thresholdSturges` - Sturges’装箱准则

## 轴

- `d3.axisTop` - 创建一个上部轴生成器。
- `d3.axisRight` - 创建一个右部轴生成器。
- `d3.axisBottom` - 创建一个底部轴生成器。
- `d3.axisLeft` - 创建一个左部轴生成器。
- `axis` - 为给定的选择生成轴。
- `axis.scale` - 设置比例尺。
- `axis.ticks` - 自定义刻度的生成和格式化方式。
- `axis.tickArguments` - 自定义刻度的生成和格式化方式。
- `axis.tickValues` - 明确地指定刻度值。
- `axis.tickFormat` - 明确地指定刻度格式。
- `axis.tickSize` - 设置刻度的大小。
- `axis.tickSizeInner` - 设置内刻度的大小。
- `axis.tickSizeOuter` - 设置外刻度的大小。
- `axis.tickPadding` - 设置刻度和标签之间的间距
