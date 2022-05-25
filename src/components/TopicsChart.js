import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip
} from "@visx/xychart"
import { toProperCase } from "../utils/toProperCase"
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api'
import { createTopicsData } from "../utils/createTopicsData"
import './topics-chart.css'


const TopicsChart = () => {
  const { loading, error, data } = useQuery(ALL_POSTS)
  const colors = ['#ff9a9e', '#a18cd1', '#fad0c4', '#fcb69f', '#a6c0fe', '#cfd9df', '#fccb90', '#43e97b', '#4facfe', '#fee140', '#30cfd0', '#330867', '#fed6e3', '#5ee7df']
  const tickLabelOffset = 10

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const dataForChart = createTopicsData(data.allPosts)

  const accessors = {
    xAccessor: (d) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d) => d.y
  }

  return (
    <>
      <h2 >Posts per month by topic</h2>
      <XYChart
        height={400}
        width={800}
        margin={{ left: 60, top: 20, bottom: 10, right: 60 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          renderTooltip={({ tooltipData }) => (
              <div>
                {`${toProperCase(tooltipData.nearestDatum.key)}: ${accessors.yAccessor(tooltipData.nearestDatum.datum)}`}
              </div>
          )}
        />
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#a9a9a9",
            strokeLinecap: "round",
            strokeWidth: 1
          }}
          strokeDasharray="0, 4"
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="bottom"
          tickLabelProps={() => ({ dy: tickLabelOffset })}
          left={30}
          numTicks={4}
        />
        <AnimatedAxis
          hideAxisLine
          hideTicks
          orientation="left"
          numTicks={4}
          tickLabelProps={() => ({ dx: -10 })}
        />
        {Object.keys(dataForChart).map((topic, i) => {
          return ( <AnimatedLineSeries
            key={i}
            stroke={colors[i]}
            dataKey={topic}
            data={dataForChart[topic]}
            {...accessors}
          />)
        })}
      </XYChart>
    </>
  )
}

export default TopicsChart