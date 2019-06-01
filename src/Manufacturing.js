import React from 'react';

import { numberWithCommas } from './misc';

const Manufacturing = props => {
  const {
    wire,
    wirePrice,
    cash,
    clipsPerSecond,
    buyWire,
    clippers,
    buyClipper,
    clipperPrice
  } = props;

  return (
    <>
      <h3>Manufacturing</h3>
      Clips per Second: {numberWithCommas(clipsPerSecond)}
      <br />
      <br />
      Wire: {numberWithCommas(wire)}
      <br />
      <button onClick={buyWire} disabled={cash < wirePrice}>
        Buy Wire
      </button>
      &nbsp; Cost: ${wirePrice.toFixed(2)}
      <br />
      <br />
      AutoClippers: {numberWithCommas(clippers)}
      <br />
      <button onClick={buyClipper} disabled={cash < clipperPrice}>
        Buy AutoClipper
      </button>
      &nbsp; Cost: ${clipperPrice.toFixed(2)}
    </>
  );
};

export default Manufacturing;
