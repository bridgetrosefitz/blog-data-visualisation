import React from 'react'
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api';

const Test = props => {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const toProperCase = sentence => {
    
    const wordsInTitle = sentence.split(" ")
    const properCaseWordsInTitle = wordsInTitle.map(word => {
      const firstLetter = word[0]
      const restOfWord = word.slice(1)
      const upperCaseWord = firstLetter.toUpperCase() + restOfWord
      return upperCaseWord
    })

    let concatenatedSentence = ''
    properCaseWordsInTitle.forEach((word, index) => {
      concatenatedSentence += (index !== 0 ? ` ${word}` : word)
    })

    return concatenatedSentence
  }

  return data.allPosts.map(({ title, published, likelyTopics }, index) => {
    let topic = {label: '', likelihood: 0}

    likelyTopics.forEach(possibleTopic => {
      if(possibleTopic.likelihood > topic.likelihood) {
        topic = possibleTopic
      }
      // Add logic for if there are two topics with equal likelihood
    })

    if(published) { 
      return (
      <div key={index}>
        <p>
          {`${toProperCase(topic.label)} - ${toProperCase(title)}`}
        </p>
      </div>)
    } else return null
  });
}

export default Test