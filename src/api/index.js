import { 
  gql 
} from '@apollo/client'

export const ALL_POSTS = gql`
  query {
    allPosts(count: 1000) {
      title
      published
      createdAt
      likelyTopics {
        label
        likelihood
      }
    }
  }
`
