import gql from 'graphql-tag';

export const newDocument = gql`
  mutation newDocument($title: String!, $tags: [String!], $file: Upload!) {
    newDocument(title: $title, tags: $tags, file: $file) {
      id
      title
      tags {
        title
      }
    }
  }
`;
