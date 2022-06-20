// This function requires rawData in the specific shape that is returned from the Apollo / GraphQL request in /api/index.js
export const createTopicsData = rawData => {

  const topicsData = {}

  rawData.forEach(post => {

    // FEEDBACK FROM NPLAN: Use sort or reduce instead of iterating through, to make code more readable
    
    // OPTION 1 - SORT

    // const topicsSortedByLikelihood = [...post.likelyTopics].sort((a, b) => {
    //   if(a.likelihood > b.likelihood) {
    //     return -1
    //   } else return 1
    // })

    // const topic = topicsSortedByLikelihood[0].label

    // OPTION 2 - REDUCE

    const topicObject = post.likelyTopics.reduce(
      (previousValue, currentValue) => currentValue.likelihood > previousValue.likelihood ? previousValue : currentValue    
    )

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

    // If a key for the topic already exists...
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

  // Sort the topic-date objects by their year-month
  Object.keys(topicsData).forEach(topic => {
    topicsData[topic].sort((a,b) => {
     return a.date > b.date ? 1 : -1
    })
  })

  // Ensure that each topic has a data point for every month of the year
  Object.keys(topicsData).forEach(topic => {
    
    let currentMonth = 0

    // Go through the sorted topic-date objects, and if the month is not the index you would expect as we increment currentMonth, 
    // i.e. the month is missing, insert an object which has y: 0 for that month
    while(currentMonth < 12) {
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
    
  return topicsData

}

// Refactor to turn pieces of the work into functions, esp. manipulate dates, and then format them