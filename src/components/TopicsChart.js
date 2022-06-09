import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip
} from "@visx/xychart"
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api'
import { createTopicsData } from "../utils/createTopicsData"
import { toProperCase } from "../utils/toProperCase"
import './topics-chart.css'

const TopicsChart = ({ someStyles }) => {

  // FEEDBACK: Look at memoization useMemo in case props are passed in

  // Load data from the database
  const { loading, error, data } = useQuery(ALL_POSTS)
  
  // Colors and formatting for chart and lines
  const colors = ['#ff9a9e', '#a18cd1', '#fad0c4', '#fcb69f', '#a6c0fe', '#cfd9df', '#fccb90', '#43e97b', '#4facfe', '#fee140', '#30cfd0', '#330867', '#fed6e3', '#5ee7df']
  const tickLabelOffset = 10

  if (loading) return (<><p>Loading...</p><p className='fine-print'>...just a few seconds while we fetch 1,000 rows of data.</p></>)
  if (error) return <p>Error :(</p>

  // Transform the data to be the right shape for the accessors and XY chart
  const dataForChart = createTopicsData(data.allPosts)

  // Define what X and Y are for the chart
  const accessors = {
    xAccessor: (d) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d) => d.y
  }

  return (
    <>
      <h2 >Posts per month by topic (2019)*</h2>
      <XYChart
        height={400}
        width={800}
        margin={{ left: 60, top: 20, bottom: 40, right: 60 }}
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
      <ul className='explanatory-text'>
        <li>Take a look at the popularity of blog posts on different topics over time. </li>
        <li>Browse the graph with your mouse to view more detail.</li>
      </ul>
      <p className='fine-print'>
        * Data represents both published and unpublished posts. Based on a sample of 1000 posts from 2019. The topic of a post is determined by machine learning.
      </p>
    </>
  )
}

export default TopicsChart