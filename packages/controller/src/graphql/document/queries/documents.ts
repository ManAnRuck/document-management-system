import gql from 'graphql-tag';

export default gql`
  query documents {
    documents {
      id
      title
      tags {
        title
      }
    }
  }
`;
