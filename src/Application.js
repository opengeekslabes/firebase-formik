import React from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Application() {
  return (

        <Router>
          <SignUp path="signUp" />
          <SignIn path="/" />
        </Router>

  );
}
export default Application;