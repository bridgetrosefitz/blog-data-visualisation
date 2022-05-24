import React from 'react'
import {
  useQuery
} from '@apollo/client'
import { ALL_POSTS } from '../api';

const Test = props => {
  const { loading, error, data } = useQuery(ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.allPosts.map(({ title, published }) => (
    <div key={title}>
      <p>
        {title}
      </p>
    </div>
  ));
}

export default Test