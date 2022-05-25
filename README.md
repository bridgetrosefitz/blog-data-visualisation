# Hello!


## Notes and assumptions

- My research led me to believe that you can't query GraphQL databases to group rows in a DB unless the schema has been designed that way on the back end. *Double check Apollo doens't have a work horse that allows you to do this* It seems like the fakerQL DB doesn't have this functionality. I am unsure how many Post rows there are in the DB, because I cannot count them *Maybe try incrementing by 1000s again* I thought I could query by published=true or within a certain date range, to reduce the dataset, but again, the DB doesn't seem set up for that. So, for the purposes of creating a finished chart within the test timeframe, I have taken a sample of XXX rows only. I chose XXX because approx Y% are published and ...
- I built a method on the front end to turn the data into the shape I wanted for my chart.
- Would do a better logic for deciding acceptable topic based on likelihood
- It looks like the first likely topic in the array is always the highest likelihood match
- I tested up to 100k datapoints and they all seem to be from 2019, so I haven't built a check for multiple years in createTopicsData