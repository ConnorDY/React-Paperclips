import React from 'react';

import { numberWithCommas } from './misc';

const Manufacturing = props => {
  const { wire, wirePrice, cash, clipsPerSecond, buyWire } = props;

  return (
    <>
      <h3>Manufacturing</h3>
      Clips per Second: {clipsPerSecond}
      <br />
      <br />
      Wire: {numberWithCommas(wire)}
      <br />
      <button onClick={buyWire} disabled={cash < wirePrice ? true : false}>
        Buy Wire
      </button>
      &nbsp; Cost: ${wirePrice}
    </>
  );
};

export default Manufacturing;
