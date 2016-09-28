import { configure, setAddon } from '@kadira/storybook';
import reduxStory from './addons/reduxStory';


setAddon(reduxStory);

function loadStories() {
  const componentsContext = require.context('vclub/components', true, /Stories\.js$/);
  const viewsContext = require.context('vclub/views', true, /Stories\.js$/);

  componentsContext.keys().sort().forEach(componentsContext);
  viewsContext.keys().sort().forEach(viewsContext);
}

configure(loadStories, module);
