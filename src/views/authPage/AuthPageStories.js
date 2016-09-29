import React from 'react';
import { storiesOf } from '@kadira/storybook';

import AuthPage from 'vclub/views/authPage/AuthPage';

const auth = storiesOf('AuthPageStories', module);

auth.add('default view', () => (
    <AuthPage />
));