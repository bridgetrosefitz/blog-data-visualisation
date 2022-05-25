export const createTopicsData = rawData => {

  const topicsData = {}

  rawData.forEach(post => {

    // Get the most likely topic for this post
    let topicObject

    post.likelyTopics.forEach(possibleTopic => {
      if(!topicObject) {
       topicObject = possibleTopic   
      }

      if (possibleTopic.likelihood > topicObject.likelihood) {
        topicObject = possibleTopic
      } 
      // Add logic for if there are two topics with equal likelihood
    })

    const topic = topicObject.label

    // Prepare the date of the current post
    const datePostCreated = new Date(parseInt(post.createdAt))
    const yearPostCreated = datePostCreated.getFullYear()
    const monthPostCreated = datePostCreated.toLocaleString("en-US", { month: "2-digit" })
    const dateString = `${yearPostCreated}-${monthPostCreated}`

    // Pre-prepare a new topic-date object
    const newTopicDateObject = {
      x: dateString,
      y: 1,
      date: datePostCreated
    }

    // If a key for the topic exists...
    if (topicsData[topic]) {

      // See if a topic-date object within that topic is from the same year-month as the current post
      const postObjectWithSameDate = topicsData[topic].find(topicDataObject => {
        return topicDataObject.x === dateString
      })

      // If a topic-date object with the same year-month does exist, increment the number of times we've seen that topic
      if (postObjectWithSameDate) {
        postObjectWithSameDate.y++
      } else {
        // If one doesn't exist, make a new topic-date object and push it into the topic array
        topicsData[topic].push(newTopicDateObject)
      }
    } else {
      // If a key for the topic doesn't exist, make a new key and push the topic-date object into a new array
      topicsData[topic] = [newTopicDateObject]
    }

    
  })

  Object.keys(topicsData).forEach(topic => {
    topicsData[topic].sort((a,b) => {
     return a.date > b.date ? 1 : -1
    })
  })
    
  return topicsData

}

// const targetShape = {
//   'celebrity': [
//     {
//       x: "2019-01",
//       y: 5,
//     },
//     {
//       x: "2019-02",
//       y: 6,
//     },
//     {
//       x: "2019-03",
//       y: 8,
//     }
//   ],
//   'potato': [
//     {
//       x: "2019-01",
//       y: 2,
//     },
//     {
//       x: "2019-02",
//       y: 0,
//     },
//     {
//       x: "2019-03",
//       y: 3,
//     }
//   ],
//   'sport': [
//     {
//       x: "2019-01",
//       y: 6,
//     },
//     {
//       x: "2019-02",
//       y: 9,
//     },
//     {
//       x: "2019-03",
//       y: 10,
//     }
//   ]
// }

// const exampleData = [
//   {
//     "__typename": "Post",
//     "title": "metrics Buckinghamshire bypass",
//     "published": false,
//     "createdAt": "1553979028539",
//     "likelyTopics": [
//       {
//         "__typename": "Topic",
//         "label": "potato",
//         "likelihood": 0.19172122109852405
//       },
//       {
//         "__typename": "Topic",
//         "label": "birthday",
//         "likelihood": 0.17953088022749217
//       },
//       {
//         "__typename": "Topic",
//         "label": "sport",
//         "likelihood": 0.15687516306130528
//       },
//       {
//         "__typename": "Topic",
//         "label": "fishing",
//         "likelihood": 0.1503276109197374
//       },
//       {
//         "__typename": "Topic",
//         "label": "management",
//         "likelihood": 0.10633306994899316
//       },
//       {
//         "__typename": "Topic",
//         "label": "shopping",
//         "likelihood": 0.0704223062176511
//       },
//       {
//         "__typename": "Topic",
//         "label": "wedding",
//         "likelihood": 0.05804740379100422
//       },
//       {
//         "__typename": "Topic",
//         "label": "security",
//         "likelihood": 0.048410755027312416
//       },
//       {
//         "__typename": "Topic",
//         "label": "celebrity",
//         "likelihood": 0.03463721846934813
//       },
//       {
//         "__typename": "Topic",
//         "label": "community",
//         "likelihood": 0.003694371238631963
//       }
//     ]
//   },
//   {
//     "__typename": "Post",
//     "title": "deposit",
//     "published": false,
//     "createdAt": "1574735747878",
//     "likelyTopics": [
//       {
//         "__typename": "Topic",
//         "label": "birthday",
//         "likelihood": 0.179702043166034
//       },
//       {
//         "__typename": "Topic",
//         "label": "celebrity",
//         "likelihood": 0.16982215434866585
//       },
//       {
//         "__typename": "Topic",
//         "label": "sport",
//         "likelihood": 0.12768880703990076
//       },
//       {
//         "__typename": "Topic",
//         "label": "shopping",
//         "likelihood": 0.10582668103748086
//       },
//       {
//         "__typename": "Topic",
//         "label": "fishing",
//         "likelihood": 0.10543785622793296
//       },
//       {
//         "__typename": "Topic",
//         "label": "security",
//         "likelihood": 0.0890386072087081
//       },
//       {
//         "__typename": "Topic",
//         "label": "management",
//         "likelihood": 0.0832674957325296
//       },
//       {
//         "__typename": "Topic",
//         "label": "potato",
//         "likelihood": 0.06842521299656987
//       },
//       {
//         "__typename": "Topic",
//         "label": "community",
//         "likelihood": 0.03755457330706339
//       },
//       {
//         "__typename": "Topic",
//         "label": "wedding",
//         "likelihood": 0.033236568935114626
//       }
//     ]
//   },
//   {
//     "__typename": "Post",
//     "title": "Architect Square",
//     "published": true,
//     "createdAt": "1569730282306",
//     "likelyTopics": [
//       {
//         "__typename": "Topic",
//         "label": "fishing",
//         "likelihood": 0.19648051295321922
//       },
//       {
//         "__typename": "Topic",
//         "label": "potato",
//         "likelihood": 0.14717851552790728
//       },
//       {
//         "__typename": "Topic",
//         "label": "management",
//         "likelihood": 0.14262985546461168
//       },
//       {
//         "__typename": "Topic",
//         "label": "birthday",
//         "likelihood": 0.11977370181804092
//       },
//       {
//         "__typename": "Topic",
//         "label": "sport",
//         "likelihood": 0.08867629162094381
//       },
//       {
//         "__typename": "Topic",
//         "label": "community",
//         "likelihood": 0.0885887199543411
//       },
//       {
//         "__typename": "Topic",
//         "label": "shopping",
//         "likelihood": 0.08375837034005515
//       },
//       {
//         "__typename": "Topic",
//         "label": "celebrity",
//         "likelihood": 0.06938420223827896
//       },
//       {
//         "__typename": "Topic",
//         "label": "security",
//         "likelihood": 0.047565206346938615
//       },
//       {
//         "__typename": "Topic",
//         "label": "wedding",
//         "likelihood": 0.01596462373566325
//       }
//     ]
//   }
// ]

