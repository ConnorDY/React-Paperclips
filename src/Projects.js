import React, { useState, useEffect } from 'react';
import useInterval from '@use-it/interval';

import allProjects from './allProjects';
// import { numberWithCommas } from './misc';

const Projects = props => {
  const [available, setAvailable] = useState([]);
  const { activeProjects, setActiveProjects } = props;

  const state = { ...props };
  delete state.activeProjects;
  delete state.setActiveProjects;

  useInterval(() => {
    const a = allProjects.filter(
      (proj, i) => !activeProjects.includes(i) && proj.trigger(state)
    );
    setAvailable(a);
  }, 500);

  useEffect(() => {
    console.log(state.clipperBoost);
  }, [state.clipperBoost]);

  const showProjects = available.map((proj, i) => (
    <button
      key={`proj${i}`}
      onClick={() => {
        setActiveProjects([...activeProjects, i]);
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
