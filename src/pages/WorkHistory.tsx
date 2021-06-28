import React from "react";
import Section from '../components/Section';
import WorkLine from '../components/WorkLine';

const WorkHistory: React.FunctionComponent = () => {

  return (
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
  );
};

export default WorkHistory;
