import { 
  gql 
} from '@apollo/client'

export const ALL_POSTS = gql`
  query {
    allPosts(count: 5) {
      title
      published
    }
  }
`;