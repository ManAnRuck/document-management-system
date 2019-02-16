export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

export type NewDocumentVariables = {
  title: string;
  tags?: Maybe<string[]>;
};

export type NewDocumentMutation = {
  __typename?: 'Mutation';

  newDocument: NewDocumentNewDocument;
};

export type NewDocumentNewDocument = {
  __typename?: 'Document';

  id: string;

  title: string;

  tags: Maybe<NewDocumentTags[]>;
};

export type NewDocumentTags = {
  __typename?: 'Tag';

  title: string;
};

export type LogoutVariables = {};

export type LogoutMutation = {
  __typename?: 'Mutation';

  logout: boolean;
};

export type RegisterVariables = {
  email: string;
  password: string;
};

export type RegisterMutation = {
  __typename?: 'Mutation';

  register: RegisterRegister;
};

export type RegisterRegister = {
  __typename?: 'User';

  id: string;

  username: string;
};

export type MeVariables = {};

export type MeQuery = {
  __typename?: 'Query';

  me: Maybe<MeMe>;
};

export type MeMe = {
  __typename?: 'User';

  id: string;

  username: string;
};

export type UsersVariables = {};

export type UsersQuery = {
  __typename?: 'Query';

  users: UsersUsers[];
};

export type UsersUsers = {
  __typename?: 'User';

  id: string;

  username: string;
};

import * as ReactApollo from 'react-apollo';
import * as React from 'react';

import gql from 'graphql-tag';

// ====================================================
// Components
// ====================================================

export const NewDocumentDocument = gql`
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
export class NewDocumentComponent extends React.Component<
  Partial<ReactApollo.MutationProps<NewDocumentMutation, NewDocumentVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<NewDocumentMutation, NewDocumentVariables>
        mutation={NewDocumentDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type NewDocumentProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<NewDocumentMutation, NewDocumentVariables>
> &
  TChildProps;
export type NewDocumentMutationFn = ReactApollo.MutationFn<
  NewDocumentMutation,
  NewDocumentVariables
>;
export function NewDocumentHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        NewDocumentMutation,
        NewDocumentVariables,
        NewDocumentProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    NewDocumentMutation,
    NewDocumentVariables,
    NewDocumentProps<TChildProps>
  >(NewDocumentDocument, operationOptions);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export class LogoutComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LogoutMutation, LogoutVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LogoutMutation, LogoutVariables>
        mutation={LogoutDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type LogoutProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<LogoutMutation, LogoutVariables>
> &
  TChildProps;
export type LogoutMutationFn = ReactApollo.MutationFn<
  LogoutMutation,
  LogoutVariables
>;
export function LogoutHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LogoutMutation,
        LogoutVariables,
        LogoutProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    LogoutMutation,
    LogoutVariables,
    LogoutProps<TChildProps>
  >(LogoutDocument, operationOptions);
}
export const RegisterDocument = gql`
  mutation register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      id
      username
    }
  }
`;
export class RegisterComponent extends React.Component<
  Partial<ReactApollo.MutationProps<RegisterMutation, RegisterVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<RegisterMutation, RegisterVariables>
        mutation={RegisterDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type RegisterProps<TChildProps = any> = Partial<
  ReactApollo.MutateProps<RegisterMutation, RegisterVariables>
> &
  TChildProps;
export type RegisterMutationFn = ReactApollo.MutationFn<
  RegisterMutation,
  RegisterVariables
>;
export function RegisterHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutation,
        RegisterVariables,
        RegisterProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    RegisterMutation,
    RegisterVariables,
    RegisterProps<TChildProps>
  >(RegisterDocument, operationOptions);
}
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;
export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeVariables>
        query={MeDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type MeProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<MeQuery, MeVariables>
> &
  TChildProps;
export function MeHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeVariables,
        MeProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    MeQuery,
    MeVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
export const UsersDocument = gql`
  query Users {
    users {
      id
      username
    }
  }
`;
export class UsersComponent extends React.Component<
  Partial<ReactApollo.QueryProps<UsersQuery, UsersVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<UsersQuery, UsersVariables>
        query={UsersDocument}
        {...(this as any)['props'] as any}
      />
    );
  }
}
export type UsersProps<TChildProps = any> = Partial<
  ReactApollo.DataProps<UsersQuery, UsersVariables>
> &
  TChildProps;
export function UsersHOC<TProps, TChildProps = any>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UsersQuery,
        UsersVariables,
        UsersProps<TChildProps>
      >
    | undefined,
) {
  return ReactApollo.graphql<
    TProps,
    UsersQuery,
    UsersVariables,
    UsersProps<TChildProps>
  >(UsersDocument, operationOptions);
}
