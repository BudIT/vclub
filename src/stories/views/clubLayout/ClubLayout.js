import React from 'react';
import { storiesOf } from '@kadira/storybook';

import ClubLayout from 'vclub/views/clubLayout/ClubLayout';


const book = storiesOf('views.clubLayout.ClubLayout', module);

book.add('Default', () => (
  <ClubLayout />
));

book.add('Use case #1', () => (
  <ClubLayout prop1="value1" prop2="value2" />
));

book.add('Use case #2', () => (
  <ClubLayout prop1="SUPERVALUE1" prop2="SUPERVALUE2" />
));
