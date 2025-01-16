import { BrowserRouter, Switch, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import JobsPage from "./components/JobsPage";
import JobItemDetails from "./components/JobItemDetails";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    </Switch>
  </BrowserRouter>
);

export default App;
