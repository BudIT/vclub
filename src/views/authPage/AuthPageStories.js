/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import React from 'react';
import { storiesOf } from '@kadira/storybook';

import AuthPage from './AuthPage';

const book = storiesOf('AuthPage', module);

book.addReduxStory('default view', () => (
  <AuthPage />
));
