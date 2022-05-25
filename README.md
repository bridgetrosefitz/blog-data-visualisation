# Hello!

## Background

- This was fun! Thanks for the chance to learn some new libraries and technologies :) Prior to this task, I hadn't ever worked with GraphQL, Apollo, VisX or D3. I taught myself, and this code is as far as I was able to progress within the timeframe, executing on these new skillsets. See below for the things I wish I'd had time to do.

## How to view the app

- run `npm install` from the top level of the directory
- run `npm start` from the top level of the directory

## Notes and assumptions

- I built logic here on the front-end to transform data from the database at https://fakerql.nplan.io/ into a workable shape for my chart. My research led me to believe that there isn't an easy solution to query GraphQL databases to group / aggregate rows from the database (e.g. by year / month / topic), or to filter results (e.g. by published = true, or by a time range) unless the schema and queries have been configured to allow this on the back-end. It seems like this hasn't been implemented in the database for this task - only pagination for allPosts is possible. If I had control of the backend, for performance and convenience, I'd definitely consider surfacing some of these kinds of things.
- For the purposes of creating a finished chart within the timeframe, I took a sample of 1,000 rows only. I tested up to 100,000 rows and all the posts seemed to be from 2019. Ideally, I would show an exhaustive sample of all posts for the whole year, but I was unable to know how many rows of data this would equate to.
- Given my test where even 100,000 results were all from 2019, and for simplicity, my logic for transforming the data in createTopicsData takes some shortcuts and does not check for which year each datapoint is from.
- For simplicity, I assumed that the topic for a given post was that which had the highest-value likelihood. It would be better to decide on a thoughtful threshold of likelihood for what can be considered the 'correct' topic. 
- I included one basic test. It doesn't do any substantively useful tests for the content of the page. I'd do more, but I ran out of time :)

## Things I'd do in future
- Create logic to toggle the chart into a rolling 28 day average! I would have liked to provide the option to toggle to an R28 for this chart, to make the trends more easily visible, because the raw data is quite jumpy.
- Improve the number of months visible on the X axis of the chart
- Improve the tooltip so that it is clearer which line the label refers to (possibly by using matching colours to the line)
- Improve the time to load. For now, I tried to manage loading expectations  with a little bit of copy as the data loads

