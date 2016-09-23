import { configure, setAddon } from '@kadira/storybook';
import reduxStory from './addons/reduxStory';


setAddon(reduxStory);

function loadStories() {
  const storiesContext = require.context('vclub/stories', true, /Stories\.js$/);

  storiesContext.keys().sort().forEach(storiesContext);
}

configure(loadStories, module);
