// The code below requires rawData in the specific shape that is returned from the Apollo / GraphQL request in /api/index.js

export const createTopicsData = rawData => {

  const topicsData = {}

  // Based on the likelihood of each possible topic on a post, determine the topic with the highest likelihood
  const determineTopic = post => {

    const topicObject = post.likelyTopics.reduce(
      (previousValue, currentValue) => currentValue.likelihood > previousValue.likelihood ? previousValue : currentValue
    )

    return topicObject.label

  }

  // Create a datapoint which conforms to the shape required by the chart accessors
  const createDatapoint = post => {

    const datePostCreated = new Date(parseInt(post.createdAt))
    const yearPostCreated = datePostCreated.getFullYear()
    const monthPostCreated = datePostCreated.toLocaleString("en-US", { month: "2-digit" })
    const dateString = `${yearPostCreated}-${monthPostCreated}`

    return {
      x: dateString,
      y: 1,
      date: datePostCreated
    }

  }  
  
  // Sort datapoints chronologically in each topic array
  const sortDataPoints = data => {

    Object.keys(data).forEach(topic => {
      topicsData[topic].sort((a, b) => {
        return a.date > b.date ? 1 : -1
      })
    })

  }

  // Add a datapoint for the months when no posts were published (i.e. where y = 0)
  const addDataPointToMissingMonths = data => {

    Object.keys(topicsData).forEach(topic => {

      let currentMonth = 0

      // Go through the sorted datapoints, and if the month is not the index you would expect as we increment currentMonth, 
      // i.e. the month is missing, insert an object which has y: 0 for that month
      while (currentMonth < 12) {
        const topicDateObjectForThisMonth = topicsData[topic][currentMonth]

        if (topicDateObjectForThisMonth) {

          const monthOfElement = topicsData[topic][currentMonth].date.getMonth()
          if (monthOfElement !== currentMonth) {
            // Create a new topic-date object with the missing month, and y: 0
            const year = topicsData[topic][currentMonth].date.getFullYear()
            const month = currentMonth < 9 ? `0${currentMonth + 1}` : currentMonth + 1
            const dateString = `${year}-${month}`
            // *Look into a better way to manipulate dates than doing it manually. Maybe use a library (e.g. Moment)
            topicsData[topic].splice(currentMonth, 0, { x: dateString, y: 0, date: null })
          }

        } else {
          // Create a new topic-date object with the missing month, after we've reached the last index in the array
          // Grab the previous object's year, because we are assuming we're only getting data from the same year (2019), see README.md for more info
          const year = topicsData[topic][currentMonth - 1].x.substring(0, 4)
          const month = currentMonth < 9 ? `0${currentMonth + 1}` : currentMonth + 1
          const dateString = `${year}-${month}`
          topicsData[topic].splice(currentMonth, 0, { x: dateString, y: 0, date: null })

          // *Look into a better way to manipulate dates than doing it manually. Maybe use a library (e.g. Moment)

        }

        currentMonth++

      }
    })

  }

  // For all posts in the dataset, populate topicsData with a key for each topic
  // and an array of data points in each topic showing a tally of the number of posts on that topic published each month
  rawData.forEach(post => {

    const topic = determineTopic(post)

    const newDataPoint = createDatapoint(post)

    // Increment the number of times we've seen blog posts published on the topic of this blog post in the month of this blog post
    // Otherwise, if we haven't yet seen a post on that topic in the month of this post, create a new datapoint
    // Or if we haven't seen any other posts on this topic, create a new key for that topic
    if (topicsData[topic]) {

      // Grab the datapoint on that topic for the current month (i.e. see if one exists)
      const dataPointForCurrentMonth = topicsData[topic].find(existingDataPoint => {
        return existingDataPoint.x === newDataPoint.x
      })

      // If a datapoint exists, increment the number of times we've seen that topic
      // If a datapoint doesn't exist, add the new datapoint
      if (dataPointForCurrentMonth) {
        dataPointForCurrentMonth.y++
      } else {
        topicsData[topic].push(newDataPoint)
      }

    // If a key for that topic doesn't already exist 
    // Make a new key and add the datapoint

    } else {
      topicsData[topic] = [newDataPoint]
    }  
  })

  // Now we've populated topicsData, sort it chronologically
  sortDataPoints(topicsData)

  // And finally, ensure that each topic has a data point for every month of the year
  addDataPointToMissingMonths(topicsData)
    
  return topicsData

}