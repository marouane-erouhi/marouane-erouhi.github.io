import "./stylesheets/styles.css";
import ProfilePicture from "./images/profile_pic_square_100x100.jpg";
import Section from "./components/Section";
import WorkLine from "./components/WorkLine";
import { Link, Route, Switch } from "react-router-dom";
import React from "react";

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
        <h3>About</h3>
        <p className="about-section">
          Hey! I'm a self taught programmer based in Toronto. I have completed
          some college doing many things from electrical ciruits to game
          development to web development. I'm currently doing web dev.
        </p>
        <nav>
          <Link className="nav-link" to="/">
            Work Experience
          </Link>
          <Link className="nav-link" to="/projects">
            Projects and Achievements
          </Link>
          <Link className="nav-link" to="/random-thoughts">
            Random thoughts
          </Link>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/">
            <Section title="Work History">
              <WorkLine
                companyName="Supwrap"
                jobTitle="Frontend Developer"
                duration="May 2021 - June 2021"
              />
              <hr className="light-ruler" />
              <WorkLine
                companyName="University of Toronto"
                jobTitle="Teaching Assistant"
                duration="Sept 2018 - Dec 2018"
              />
              <hr className="light-ruler" />
              <WorkLine
                companyName="Freelance"
                jobTitle="Frontend Lead"
                duration="Dec 2016 - Sept 2017"
              />
            </Section>
          </Route>
          <Route exact path="/projects">
            <Section title="Projects and Achievements">TODO</Section>
          </Route>
          <Route exact path="/random-thoughts">
            <Section title="Random thoughts">TODO</Section>
          </Route>
        </Switch>
        <div className="bottom-spacer"></div>
      </div>
    </div>
  );
}
