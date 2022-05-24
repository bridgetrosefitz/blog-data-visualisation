import { 
  gql 
} from '@apollo/client'

export const ALL_POSTS = gql`
  query {
    allPosts(count: 100) {
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