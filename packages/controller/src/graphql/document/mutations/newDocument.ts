import gql from 'graphql-tag';

export const newDocument = gql`
  mutation newDocument($title: String!, $tags: [String!]) {
    newDocument(title: $title, tags: $tags) {
      id
      title
      tags {
        title
      }
    }
  }
`;
