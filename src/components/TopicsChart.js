import {
  AnimatedAxis,
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart
} from "@visx/xychart";
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api';
import { createTopicsData } from "../utils/createTopicsData";

const data1 = [
  {
    x: "2018-03-01",
    y: 30
  },
  {
    x: "2018-04-01",
    y: 16
  },
  {
    x: "2018-05-01",
    y: 17
  },
  {
    x: "2018-06-01",
    y: 24
  },
  {
    x: "2018-07-01",
    y: 47
  },
  {
    x: "2018-08-01",
    y: 32
  },
  {
    x: "2018-09-01",
    y: 8
  },
  {
    x: "2018-10-01",
    y: 27
  },
  {
    x: "2018-11-01",
    y: 31
  },
  {
    x: "2018-12-01",
    y: 105
  },
  {
    x: "2019-01-01",
    y: 166
  },
  {
    x: "2019-02-01",
    y: 181
  },
  {
    x: "2019-03-01",
    y: 232
  },
  {
    x: "2019-04-01",
    y: 224
  },
  {
    x: "2019-05-01",
    y: 196
  },
  {
    x: "2019-06-01",
    y: 211
  }
];

const originalData = [
{
  "title": "Licensed Frozen Mouse",
  "published": true,
  "createdAt": "1556287055387",
  "likelyTopic": "wedding"
},
{
  "title": "pink",
  "published": false,
  "createdAt": "1556287055387",
  "likelyTopic": "wedding"
},
{
  "title": "pink",
  "published": false,
  "createdAt": "1563502833851",
  "likelyTopic": "celebrity"
}]

const celebrity = [
  {
    x: "2019-01",
    y: 5,
  },
  {
    x: "2019-02",
    y: 6,
  },
  {
    x: "2019-03",
    y: 8,
  }
]

const data3 = {
  'celebrity': [
    {
      x: "2019-01",
      y: 5,
    },
    {
      x: "2019-02",
      y: 6,
    },
    {
      x: "2019-03",
      y: 8,
    }
  ],
  'potato': [
    {
      x: "2019-01",
      y: 2,
    },
    {
      x: "2019-02",
      y: 0,
    },
    {
      x: "2019-03",
      y: 3,
    }
  ],
  'sport': [
    {
      x: "2019-01",
      y: 6,
    },
    {
      x: "2019-02",
      y: 9,
    },
    {
      x: "2019-03",
      y: 10,
    }
  ]
}

const TopicsChart = () => {
  const { loading, error, data } = useQuery(ALL_POSTS);
  const colors = ['#ff9a9e', '#a18cd1', '#fad0c4', '#fcb69f', '#a6c0fe', '#cfd9df', '#fccb90', '#43e97b', '#4facfe', '#fee140', '#30cfd0', '#330867', '#fed6e3', '#5ee7df']
  const tickLabelOffset = 10;

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const dataForChart = createTopicsData(data.allPosts)

    const accessors = {
    xAccessor: (d) => new Date(`${d.x}T00:00:00`),
    yAccessor: (d) => d.y
  };

  
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
  );
};

export default TopicsChart