import "./stylesheets/styles.css";
import ProfilePicture from "./images/profile_pic_square_100x100.jpg";
import Section from "./components/Section";
import WorkLine from "./components/WorkLine";
import { Link, Route, Switch } from "react-router-dom";
import React from "react";

import WorkHistory from "./pages/WorkHistory";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <div className="App">
      <img
        className="profilePicture"
        src={ProfilePicture}
        alt="profile pictue"
        width={100}
      />
      <h1 className="name">Marouane Er-Rouhi</h1>
      <div className="main-content">
        <hr />
        <Section title="About">
          <p className="about-section">
            Hey! I'm a self taught programmer based in Toronto. I have completed
            some college doing many things from electrical ciruits to game
            development to web development. I'm currently doing web dev.
          </p>
        </Section>
        <nav>
          <Link className="nav-link" to="/">
            Work Experience
          </Link>
          <Link className="nav-link" to="/projects">
            Projects and Achievements
          </Link>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={WorkHistory} />
          <Route exact path="/projects" component={Projects} />
        </Switch>
        <div className="bottom-spacer"></div>
      </div>
    </div>
  );
}
