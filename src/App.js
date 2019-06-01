import React, { useState, useEffect } from 'react';
import useInterval from '@use-it/interval';
import roundTo from 'round-to';

const startClips = 1000;

const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const App = () => {
  // init state
  const [cash, setCash] = useState(0);
  const [cashPerSecond, setCashPerSecond] = useState(0);
  const [profitList, setProfitList] = useState([0]);
  const [clips, setClips] = useState(startClips);
  const [totalClips, setTotalClips] = useState(startClips);
  const [clipPrice, setClipPrice] = useState(0.25);
  const [demand, setDemand] = useState(1);
  const [demandFactor, setDemandFactor] = useState(1);

  // make a clip
  const makeClip = () => {
    setClips(clips + 1);
    setTotalClips(totalClips + 1);
  };

  // sell a clip
  const sellClips = num => {
    if (num > clips) num = clips;
    setClips(clips - num);

    const profit = clipPrice * num;
    setCash(cash + profit);

    return profit;
  };

  // increase or decrease the price of a clip
  const increasePrice = () => {
    setClipPrice(roundTo(clipPrice + 0.01, 2));
  };

  const decreasePrice = () => {
    if (clipPrice < 0.02) return;
    setClipPrice(roundTo(clipPrice - 0.01, 2));
  };

  // market demand calculation
  const calcDemand = () => {
    setDemand(roundTo((0.8 / clipPrice) * 1.1 ** 0 * demandFactor, 2));
  };

  // sell clips at a rate according to the market demand
  useInterval(() => {
    let profit = 0;
    if (clips > 0) profit = sellClips(Math.floor(0.7 * demand ** 1.15));

    // average cash per second
    const profits = [...profitList];

    if (profits.unshift(profit) > 5) profits.pop();
    setProfitList(profits);

    const total = profits.reduce((tot, v) => tot + v, 0);
    setCashPerSecond(total / profits.length);
  }, 1000);

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
      Cash: ${cash.toFixed(2)} (${cashPerSecond.toFixed(2)}/s)
      <br />
      Clip Price: ${clipPrice.toFixed(2)}
      &nbsp;<button onClick={decreasePrice}>&darr;</button>
      &nbsp;<button onClick={increasePrice}>&uarr;</button>
      <br />
      Demand: {(demand * 10).toFixed(0)}%
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
