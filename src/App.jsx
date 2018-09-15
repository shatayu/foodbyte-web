import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import routes from './routes/index.js';
import Logo from './components/Logo.jsx';

const App = () => {
  console.log("test4");
  return (
    <BrowserRouter>
      <div>
        <Logo />
        <Switch>
          <Route component={routes.Login} exact path='/' />
          <Route component={routes.Search} exact path='/search' />
          <Route component={routes.List} exact path='/list' />
          <Route component={routes.Recipe} exact path='/recipe' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;

ReactDOM.render(<App />, document.getElementById('app'));
