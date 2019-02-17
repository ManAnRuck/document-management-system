import {
  NewDocumentController,
  documentsQuery,
  AllTagsComponent,
} from '@docms/controller';
import * as React from 'react';
import { RegisterForm } from './Form';

export class NewDocumentConnector extends React.PureComponent {
  public succeded = async () => {
    return null;
  };

  public render() {
    return (
      <AllTagsComponent>
        {({ data }) => {
          return (
            <NewDocumentController
              succeded={this.succeded}
              refetchQueries={[{ query: documentsQuery }]}
            >
              {({ submit }) => (
                <RegisterForm submit={submit} tags={data!.allTags} />
              )}
            </NewDocumentController>
          );
        }}
      </AllTagsComponent>
    );
  }
}
