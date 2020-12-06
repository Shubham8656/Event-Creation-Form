import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Form from './components/Form/Form';
import View from './components/View/View';

function App() {
  return (
    <div className="App">
      <React.StrictMode>
        <BrowserRouter>
        <Switch>
          <Route path='/' component={Form} exact={true}/>
          <Route path='/view' component={View}/>
        </Switch>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
