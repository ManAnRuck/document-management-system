import React from 'react';
import Page from '../layouts/main';
import { NewDocumentConnector } from '../components/document/NewDocument';
import { DocumentsComponent } from '@docms/controller';
import { List, Label } from 'semantic-ui-react';

export default () => (
  <Page>
    <NewDocumentConnector />
    <DocumentsComponent>
      {({ data }) => {
        if (!data) {
          return null;
        }
        return (
          <List celled>
            {data.documents.map(({ id, title, tags }) => (
              <List.Item key={id}>
                <List.Content>
                  <List.Header>{title}</List.Header>
                  {tags &&
                    tags.map(({ title: tag }) => (
                      <Label horizontal key={tag}>
                        {tag}
                      </Label>
                    ))}
                </List.Content>
              </List.Item>
            ))}
          </List>
        );
      }}
    </DocumentsComponent>
  </Page>
);
