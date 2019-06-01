import React from 'react';

import { numberWithCommas } from './misc';

const Business = props => {
  const {
    totalClips,
    clips,
    cash,
    cashPerSecond,
    clipPrice,
    increasePrice,
    decreasePrice,
    demand,
    wire,
    makeOneClip
  } = props;

  return (
    <>
      <h3>Paperclips:</h3>
      {numberWithCommas(totalClips)}
      <br />
      <br />
      <button onClick={makeOneClip} disabled={wire <= 0 ? true : false}>
        Make Paperclip
      </button>
      <br />
      <br />
      <h3>Business:</h3>
      Funds: ${cash.toFixed(2)} (${cashPerSecond.toFixed(2)}/s)
      <br />
      Unsold: {numberWithCommas(clips)}
      <br />
      Clip Price: ${clipPrice.toFixed(2)}
      &nbsp;<button onClick={decreasePrice}>&darr;</button>
      &nbsp;<button onClick={increasePrice}>&uarr;</button>
      <br />
      Public Demand: {(demand * 10).toFixed(0)}%
    </>
  );
};

export default Business;
