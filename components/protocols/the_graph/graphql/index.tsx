import {gql} from '@apollo/client';

const TEN_MOST_EXPENSIVE_PUNKS = gql`
  query {
    punks(first: 1) {
      id
      index
      owner {
        id
      }
    }
  }
`;

export default TEN_MOST_EXPENSIVE_PUNKS;
