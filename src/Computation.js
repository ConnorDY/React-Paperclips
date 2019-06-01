import React from 'react';

import { numberWithCommas } from './misc';

const Computation = props => {
  const {
    trust,
    trustMilestone,
    processors,
    memory,
    ops,
    maxOps,
    creativity,
    increaseProcessors,
    increaseMemory
  } = props;

  const usedTrust = processors + memory;

  return (
    <>
      <h3>Computational Resources:</h3>
      Trust: {trust}
      <br />
      +1 Trust at: {numberWithCommas(trustMilestone)}
      <br />
      <br />
      Processors: {processors}
      &nbsp;{' '}
      <button onClick={increaseProcessors} disabled={usedTrust < trust}>
        +1
      </button>
      <br />
      Memory: {memory}
      &nbsp;{' '}
      <button onClick={increaseMemory} disabled={usedTrust < trust}>
        +1
      </button>
      <br />
      <br />
      Operations: {numberWithCommas(ops)} / {numberWithCommas(maxOps)}
      <br />
      Creativity: {numberWithCommas(creativity)}
    </>
  );
};

export default Computation;
