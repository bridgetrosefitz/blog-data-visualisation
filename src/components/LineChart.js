import React, { useState } from 'react'
import { Group } from '@visx/group'
import { AxisLeft, AxisBottom } from '@visx/axis'
import { extent, max } from 'd3-array'
import { LinePath } from '@visx/shape'
import { scaleTime, scaleLinear } from '@visx/scale'
import { appleStock } from "@visx/mock-data"
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api';

const LineChart = props => {

  const { loading, error, data } = useQuery(ALL_POSTS);
  // const data = appleStock.splice(0, 1000)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const dataForChart = data.allPosts

  const width = 750
  const height = 400
  const margin = {
    top: 60,
    bottom: 60,
    left: 80,
    right: 80
  }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  // data accessors
  const x = data => new Date(parseInt(data.createdAt))
  const y = data => 10
  
  // scale to fit datapoints to desired space for chart
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(dataForChart, x)
  })

  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(dataForChart, y)]
  })

  const chart = (
    <svg width={width} height={height}>
      <Group top={margin.top} left={margin.left}>
        <AxisBottom
          scale={xScale}
          top={yMax}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
        <AxisLeft
          scale={yScale}
          top={0}
          left={0}
          stroke={'#1b1a1e'}
          tickTextFill={'#1b1a1e'}
        />
        <LinePath
          data={dataForChart}
          yScale={yScale}
          x={data => xScale(new Date(parseInt(data.createdAt))) ?? 0}
          y={() => yScale(dataForChart) ?? 2}
          stroke="#333"
          strokeWidth={1}
        />
        {/* <LinePath
          data={data}
          yScale={yScale}
          x={data => xScale(new Date(data.date)) ?? 0}
          y={data => yScale(data.close) ?? 0}
          stroke="#333"
          strokeWidth={1}
        /> */}


      </Group>
    </svg>
  )


  
  return(
    <>
    {chart}
    </>
  )

}

export default LineChart