import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import routes from './routes/index.js';
import Logo from './components/Logo.jsx';
import HomeButton from './components/HomeButton.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Logo />
        <HomeButton />
        <Switch>
          <Route component={routes.Login} exact path='/' />
          <Route component={routes.Search} exact path='/search' />
          <Route component={routes.List} exact path='/list' />
          <Route component={routes.Recipe} exact path='/recipe' />
          <Route component={routes.History} exact path='/history' />
          <Route component={routes.Favorites} exact path='/favorites' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default App;
