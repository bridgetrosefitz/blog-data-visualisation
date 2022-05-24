import { 
  gql 
} from '@apollo/client'

export const ALL_POSTS = gql`
  query {
    allPosts(count: 500) {
      title
      published
      createdAt
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;