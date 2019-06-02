import React, { useState } from 'react';
import useInterval from '@use-it/interval';

import all from './allProjects';
const allProjects = all.map((proj, i) => ({ ...proj, index: i }));

// import { numberWithCommas } from './misc';

const Projects = props => {
  const [available, setAvailable] = useState([]);
  const { activeProjects, setActiveProjects } = props;

  const state = { ...props };
  delete state.activeProjects;
  delete state.setActiveProjects;

  useInterval(() => {
    // find projects that are not currently available or active and whose triggers are met
    const add = allProjects.filter(
      (proj, i) =>
        !activeProjects.includes(i) &&
        !available.includes(proj) &&
        proj.trigger(state)
    );
    // copy the current available projects list and add these new ones ^
    const _available = [...available];
    _available.push(...add);
    setAvailable(_available);
  }, 200);

  const showProjects = available.map(proj => (
    <React.Fragment key={`proj${proj.index}`}>
      <button
        onClick={() => {
          setActiveProjects([...activeProjects, proj.index]);
          const _available = [...available].filter(p => p !== proj);
          setAvailable(_available);
          proj.effect(state);
        }}
        disabled={!proj.cost(state)}
        className="project"
      >
        <b>
          {proj.title} {proj.priceTag}
        </b>
        <br />
        {proj.desc}
      </button>
      <br />
    </React.Fragment>
  ));

  return (
    <>
      <h3>Projects:</h3>
      {showProjects}
    </>
  );
};

export default Projects;
