import React, { useState, useEffect } from 'react';

import all from './allProjects';
const allProjects = all.map((proj, i) => ({ ...proj, index: i }));

// import { numberWithCommas } from './misc';

const Projects = props => {
  const [available, setAvailable] = useState([]);
  const { activeProjects, setActiveProjects } = props;

  const state = { ...props };
  delete state.activeProjects;
  delete state.setActiveProjects;

  useEffect(() => {
    const a = allProjects.filter(
      (proj, i) => !activeProjects.includes(i) && proj.trigger(state)
    );
    setAvailable(a);
  }, [state, activeProjects]);

  const showProjects = available.map(proj => (
    <button
      key={`proj${proj.index}`}
      onClick={() => {
        setActiveProjects([...activeProjects, proj.index]);
        proj.effect(state);
      }}
      disabled={!proj.cost(state)}
    >
      <b>
        {proj.title} {proj.priceTag}
      </b>
      <br />
      {proj.desc}
    </button>
  ));

  return (
    <>
      <h3>Projects:</h3>
      {showProjects}
    </>
  );
};

export default Projects;
