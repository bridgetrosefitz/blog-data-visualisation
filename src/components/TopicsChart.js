import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart
} from "@visx/xychart"
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api'
import { createTopicsData } from "../utils/createTopicsData"

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
      <XYChart
        height={270}
        margin={{ left: 60, top: 35, bottom: 38, right: 27 }}
        xScale={{ type: "time" }}
        yScale={{ type: "linear" }}
      >
        <AnimatedGrid
          columns={false}
          numTicks={4}
          lineStyle={{
            stroke: "#e1e1e1",
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
  )
}

export default TopicsChart