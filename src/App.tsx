import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ExpenseTracker from './page/ExpenseTracker';


function App() {
  const routes = [
    {
      path: '/expense-Tracker',
      component: <ExpenseTracker/>
    },
    {
      path: '/',
      component: <ExpenseTracker/>
    }
  ]
  return (
    <div className="main-wrapper">
      <BrowserRouter>
        <Switch>
          {routes.map((route, key) =>

            <Route key={key} path={`${route.path}`} render={() => route.component} exact />

          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
