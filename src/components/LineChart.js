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
  const { loading, error, data } = useQuery(ALL_POSTS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const dataForChart = data

  // const dataForchart = [
  //   { name: 'sport', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'dance', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'technology', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'movies', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'science', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'arts', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'politics', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'ceramics', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'candles', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  //   { name: 'home improvement', occurrences: {'2019jan': 2, '2019feb': 1, '2019mar': 10, '2019apr': 4, '2019may': 0, '2019jun': 1, '2019jul': 2, '2019aug': 3, '2019sep': 4, '2019oct': 2, '2019nov': 6, '2019dec': 9} },
  // ]

  // data accessors
  // const x = data => TBD
  // const y = data => TBD

  // const dataForChart = [{ label: 'sport', month: 201901, occurrences: 2 }, { label: 'sport', month: 201902, occurrences: 1 }, { label: 'dance', month: 201901, occurrences: 2 }]

  // data accessors
  // const x = data => data.month
  // const y = data => data.occurences

  // const dataForChart = [{ label: 'sport', date: "2007-04-24T07:00:00.000Z" }, { label: 'sport', date: "2007-05-24T07:00:00.000Z" }, { label: 'sport', date: "2007-05-20T07:00:00.000Z" }, { label: 'dance', date: "2007-05-24T07:00:00.000Z" }]

  // data accessors
  // const x = data => new Date(data.date)
  // const y = data => arr.reduce((a, b) => {
  //   if (new Date(a.date).getFullYear === new Date(b.date).getFullYear && new Date(a.date).getMonth === new Date(b.date).getMonth) {
  //     debugger
  //   }, 0})


  // dataForChart = {
  //   2019: 
  //   { 0: { 
  //     'Sport': [
  //       { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' }, 
  //       { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     1: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     2: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     3: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     4: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     5: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     6: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     7: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     8: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     9: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     10: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     11: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     }
  //   },
  //   2018:
  //   {
  //     0: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     1: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     2: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     3: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     4: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     5: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     6: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     7: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     8: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     9: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     10: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     11: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     }
  //   },
  //   2017:
  //   {
  //     0: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     1: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     2: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     3: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     4: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     5: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     6: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     7: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     8: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     9: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     10: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     },
  //     11: {
  //       'Sport': [
  //         { title: 'Lorem Ipsum', topic: 'Sport', published: true, createdAt: '12349865' },
  //         { title: 'Dolit pranor', topic: 'Sport', published: true, createdAt: '2249865' }],
  //       'Cooking': [
  //         { title: 'Consectetur adipiscing elit', topic: 'Cooking', published: true, createdAt: '12349865' },
  //         { title: 'ullamco laboris', topic: 'Cooking', published: true, createdAt: '2249865' }
  //       ]
  //     }
  //   }

  // data accessors
  // const x = data => 
  // const y = data => 

  // const width = 750
  // const height = 400
  // const margin = {
  //   top: 60,
  //   bottom: 60,
  //   left: 80,
  //   right: 80
  // }
  // const xMax = width - margin.left - margin.right
  // const yMax = height - margin.top - margin.bottom

  // data accessors
  // const x = data => new Date(data.date)
  // const y = data => data.close
  
  // scale to fit datapoints to desired space for chart
  // const xScale = scaleTime({
  //   range: [0, xMax],
  //   domain: extent(dataForChart, x)
  // })

  // const yScale = scaleLinear({
  //   range: [yMax, 0],
  //   domain: [0, max(dataForChart, y)]
  // })

  // const chart = (
  //   <svg width={width} height={height}>
  //     <Group top={margin.top} left={margin.left}>
  //       <AxisBottom
  //         scale={xScale}
  //         top={yMax}
  //         stroke={'#1b1a1e'}
  //         tickTextFill={'#1b1a1e'}
  //       />
  //       <AxisLeft
  //         scale={yScale}
  //         top={0}
  //         left={0}
  //         stroke={'#1b1a1e'}
  //         tickTextFill={'#1b1a1e'}
  //       />
  //       <LinePath
  //         data={dataForChart}
  //         yScale={yScale}
  //         x={data => xScale(data.month) ?? 0}
  //         y={data => yScale(data.occurences) ?? 0}
  //         stroke="#333"
  //         strokeWidth={1}
  //       />
        {/* For Apple stock data */}
        {/* <LinePath
          data={dataForChart}
          yScale={yScale}
          x={data => xScale(new Date(data.date)) ?? 0}
          y={data => yScale(data.close) ?? 0}
          stroke="#333"
          strokeWidth={1}
        /> */}
        {/* <LinePath
          data={data}
          yScale={yScale}
          x={data => xScale(new Date(data.date)) ?? 0}
          y={data => yScale(data.close) ?? 0}
          stroke="#333"
          strokeWidth={1}
        /> */}


      // </Group>
    // </svg>
  // )


  
  // return(
  //   <>
  //   {chart}
  //   </>
  // )

}

export default LineChart