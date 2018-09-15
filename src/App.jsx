import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import routes from './routes/index.js';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={routes.Login} exact path='/' />
        <Route component={routes.Search} exact path='/search' />
        <Route component={routes.List} exact path='/list' />
        <Route component={routes.Recipe} exact path='/recipe' />
      </Switch>
    </BrowserRouter>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById('app'));
