import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import Contacts from "./components/contacts/Contacts";
import AddContact from "./components/contacts/AddContact";
import EditContact from "./components/contacts/EditContact";

import Header from "./components/layout/Header";
import NotFound from "./components/pages/NotFound";
import About from "./components/pages/About";

import {Provider} from 'react-redux'
import store from './store'

import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./../node_modules/bootstrap/dist/js/bootstrap.bundle.js";

import "./App.css";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router history={history}>
        <div className="text-left">
          <Header branding="Contact Manager" />
          <div className="container">
            <div className="row">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
