import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ClubLayoutRoot from 'vclub/views/clubLayout/ClubLayoutRoot';


const book = storiesOf('views.clubLayout.ClubLayoutRoot', module);

book.add('Default', () => (
  <ClubLayoutRoot />
));
