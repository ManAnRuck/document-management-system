import { PureQueryOptions } from 'apollo-client';
import * as React from 'react';
import { NewDocumentComponent } from '../apollo-components';

interface FormValues {
  title: string;
  tags: string[];
  file: File;
}

interface Errors {
  [key: string]: string;
}

interface Props {
  children: (data: {
    submit: (values: FormValues) => Promise<Errors | null>;
  }) => JSX.Element | null;
  succeded: () => Promise<null>;
  refetchQueries?: string[] | PureQueryOptions[];
}

export class NewDocumentController extends React.PureComponent<Props> {
  public render() {
    return (
      <NewDocumentComponent>
        {mutation => {
          const submit = async (values: FormValues) => {
            try {
              console.log('VALUES', values);
              await mutation({
                variables: {
                  title: values.title,
                  tags: values.tags,
                  file: values.file,
                },
                refetchQueries: this.props.refetchQueries,
              });

              this.props.succeded();
              return null;
            } catch (err) {
              return null;
              const errors: Errors = {};
              err.graphQLErrors.forEach(
                ({
                  message,
                  formField,
                }: {
                  message: string;
                  formField: string;
                }) => {
                  errors[formField] = message;
                },
              );
              return errors;
            }
          };

          return this.props.children({ submit });
        }}
      </NewDocumentComponent>
    );
  }
}
