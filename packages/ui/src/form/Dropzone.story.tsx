import centered from '@storybook/addon-centered';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Dropzone } from './Dropzone';

const stories = storiesOf('Components/Form', module);
stories.addDecorator(withKnobs).addDecorator(centered);

stories.add('Dropzone', () => {
  return <Dropzone />;
});
