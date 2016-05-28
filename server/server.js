import express                   from 'express';
import React                     from 'react';
import { renderToString }        from 'react-dom/server'
import { RouterContext, match } from 'react-router';
import createLocation            from 'history/lib/createLocation';
import routes                    from '../src/routes';
import { Provider }              from 'react-redux';
import * as reducers             from '../src/reducers/club';
import { createStore,
         combineReducers,
         applyMiddleware }       from 'redux';
import path                      from 'path';

const app = express();


app.use( (req, res) => {
  const location = createLocation(req.url);
  const reducer  = combineReducers(reducers);
  const store    = createStore(
    reducer
  );

  match({ routes, location }, (err, redirectLocation, renderProps) => {

    if(err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }

    if(!renderProps) {
      return res.status(404).end('Not found');
    }

    const InitialView = (
      <Provider className="root" store={store}>
          <RouterContext {...renderProps} />
      </Provider>
    );

    const initialState = store.getState();
    const html = renderToString(InitialView)
    res.status(200).end(renderFullPage(html, initialState));
  })

  function renderFullPage(html, initialState) {
    return `
      <html>
        <head>
          <title>Virtual Club</title>
        </head>
        <body>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <div id="AppRoot">${html}</div>
          <script type="text/javascript" src="/club.bundle.js"></script>
        </body>
      </html>
    `
}

});

export default app;
