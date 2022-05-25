import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart'

const TestChart = props => {
  
  const data1 = [
    { x: '2019-01-01', y: 30 },
    { x: '2019-01-02', y: 35 },
    { x: '2019-01-03', y: 40 },
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
    { x: '2021-01-01', y: 50 },
    { x: '2021-01-02', y: 10 },
    { x: '2021-01-03', y: 20 },
  ]

  const data2 = [
    { x: '2019-01-01', y: 20 },
    { x: '2019-01-02', y: 15 },
    { x: '2019-01-03', y: 25 },
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 },
    { x: '2021-01-01', y: 30 },
    { x: '2021-01-02', y: 40 },
    { x: '2021-01-03', y: 80 },
  ]

  const topic1 = [
    { x: '2020-01', y: 50 },
    { x: '2020-01', y: 10 },
    { x: '2020-01', y: 20 },
  ]

  const topic2 = [
    { x: '2020-01', y: 30 },
    { x: '2020-01', y: 40 },
    { x: '2020-01', y: 80 },
  ]

  const accessors = {
    xAccessor: d => new Date(`${d.x}T00:00:00`),
    yAccessor: d => d.y,
  }
  
  return(
    <>
      <XYChart height={300} xScale={{ type: 'time' }} yScale={{ type: 'linear' }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        <AnimatedLineSeries dataKey="Line 1" data={data1} {...accessors} />
        <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} />
        {/* <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {tooltipData.nearestDatum.key}
              </div>
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {', '}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        /> */}
      </XYChart>
    </>
  )
}

export default TestChart

  