import React from 'react';
import { storiesOf } from '@kadira/storybook';

import Video from 'vclub/components/Video';


const book = storiesOf('shared.Video', module);

book.add('Default', () => (
  <Video />
));
