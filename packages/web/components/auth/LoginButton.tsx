import * as React from 'react';
import { Button, Header, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import { RegisterConnector } from './Register';

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginButton = () => (
  <Modal trigger={<Button data-testid="login-button">Log In</Button>}>
    <Modal.Header>Select a Photo</Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Header>Login</Header>
        <EmailFormWrapper>
          <RegisterConnector />
        </EmailFormWrapper>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
