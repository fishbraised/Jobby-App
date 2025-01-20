import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import JobsPage from "./components/JobsPage";
import JobItemDetails from "./components/JobItemDetails";
import NotFound from "./components/NotFound/index.";

import "./App.css";

const App = () => (
  <BrowserRouter>
    <Switch>
      <ProtectedRoute exact path="/" component={HomePage} />
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      {/* <Route exact path="/not-found" component={NotFound} /> */}
      <Redirect to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default App;

// Check if all failureviews are okay J

// css for jobdetails

// do notfound
