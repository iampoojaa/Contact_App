import React, { Component } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header";
import ContactTable from "./containers/ContactData/ContactTable";

import ContactDetails from "./containers/ContactDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <Header>
          <Switch>
            <Route path="/adduser" component={ContactDetails} />
            <Route exact path="/" component={ContactTable} />
          </Switch>
        </Header>
      </Router>
    );
  }
}

export default App;
