import React, { useState, useEffect } from 'react';
import useInterval from '@use-it/interval';
import roundTo from 'round-to';

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const App = () => {
  // init state
  const [cash, setCash] = useState(0);
  const [clips, setClips] = useState(0);
  const [totalClips, setTotalClips] = useState(0);
  const [clipPrice, setClipPrice] = useState(0.1);
  const [demand, setDemand] = useState(1);
  const [demandFactor, setDemandFactor] = useState(1);

  // make a clip
  const makeClip = () => {
    setClips(clips + 1);
    setTotalClips(totalClips + 1);
  };

  // sell a clip
  const sellClip = () => {
    setClips(clips - 1);
    setCash(cash + clipPrice);
  };

  // increase or decrease the price of a clip
  const increasePrice = () => {
    setClipPrice(roundTo(clipPrice + 0.01, 2));
  };

  const decreasePrice = () => {
    if (clipPrice < 0.02) return;
    setClipPrice(roundTo(clipPrice - 0.01, 2));
  };

  // market demand calculations
  const calcDemand = () => {
    setDemand(roundTo((0.1 / clipPrice) * demandFactor, 2));
  };

  const demandToMS = () => {
    return (1 / demand) * 1000;
  };

  // sell clips at a rate according to the market demand
  useInterval(() => {
    if (clips > 0) sellClip();
  }, demandToMS());

  // re-calculate the demand whenever the price or market demand factor changes
  useEffect(calcDemand, [clipPrice, demandFactor]);

  // render
  return (
    <>
      Total Clips: {numberWithCommas(totalClips)}
      <br />
      <br />
      Unused Clips: {numberWithCommas(clips)}
      <br />
      Cash: ${cash.toFixed(2)}
      <br />
      Clip Price: ${clipPrice.toFixed(2)}
      &nbsp;<button onClick={decreasePrice}>&darr;</button>
      &nbsp;<button onClick={increasePrice}>&uarr;</button>
      <br />
      Demand: {(demand * 100).toFixed(0)}% ({demandToMS().toFixed(0)} ms)
      <br />
      <br />
      <button onClick={makeClip}>Make Clip</button>
      <br />
      <br />
      <button
        onClick={() => {
          setDemandFactor(roundTo(demandFactor + 0.25, 2));
        }}
      >
        Increase Market Demand
      </button>
    </>
  );
};

export default App;
