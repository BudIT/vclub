/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Video from './Video';


const book = storiesOf('shared.Video', module);

book.add('Default', () => (
  <Video />
));
