import React, { useState, useEffect } from 'react';
import useInterval from '@use-it/interval';
import roundTo from 'round-to';

import Business from './Business';
import Marketing from './Marketing';
import Manufacturing from './Manufacturing';

const startClips = 0;

const App = () => {
  // init state
  const [cash, setCash] = useState(0);
  const [cashPerSecond, setCashPerSecond] = useState(0);
  const [profitList, setProfitList] = useState([0]);

  const [clips, setClips] = useState(startClips);
  const [totalClips, setTotalClips] = useState(startClips);
  const [clipPrice, setClipPrice] = useState(0.25);
  const [clipsPerSecond, setClipsPerSecond] = useState(0);
  const [clipsThisSecond, setClipsThisSecond] = useState(0);

  const [demand, setDemand] = useState(1);
  const [demandFactor, setDemandFactor] = useState(1);
  const [marketing, setMarketing] = useState(1);
  const [marketingPrice, setMarketingPrice] = useState(100);

  const [wire, setWire] = useState(1000);
  const [wirePrice, setWirePrice] = useState(20);
  const [wirePerSpool, setWirePerSpool] = useState(1000);
  const [wireCounter, setWireCounter] = useState(0);

  // make a clips
  const makeClips = num => {
    if (num > wire) num = wire;
    setClips(clips + num);
    setTotalClips(totalClips + num);
    setClipsThisSecond(clipsThisSecond + num);
    setWire(wire - num);
  };

  // sell clips
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
    setDemand(
      roundTo((0.8 / clipPrice) * 1.1 ** (marketing - 1) * demandFactor, 2)
    );
  };

  // increase marketing level
  const increaseMarketing = () => {
    setMarketing(marketing + 1);
  };

  // buy wire
  const buyWire = () => {
    setWire(wire + wirePerSpool);
    setCash(cash - wirePrice);
  };

  // tick every second
  useInterval(() => {
    // sell clips at a rate according to the market demand
    let profit = 0;
    if (clips > 0) profit = sellClips(Math.floor(0.7 * demand ** 1.15));

    // average cash per second
    const profits = [...profitList];

    if (profits.unshift(profit) > 5) profits.pop();
    setProfitList(profits);

    const total = profits.reduce((tot, v) => tot + v, 0);
    setCashPerSecond(total / profits.length);

    // clips per second
    setClipsPerSecond(clipsThisSecond);
    setClipsThisSecond(0);

    // wire price
    if (Math.random() < 0.015) {
      setWireCounter(wireCounter + 1);
      setWirePrice(Math.ceil(20 + 6 * Math.sin(wireCounter + 1)));
    }
  }, 1000);

  // re-calculate the demand whenever the price or market demand factor changes
  useEffect(calcDemand, [clipPrice, demandFactor, marketing]);

  // render
  return (
    <>
      <Business
        totalClips={totalClips}
        clips={clips}
        cash={cash}
        cashPerSecond={cashPerSecond}
        clipPrice={clipPrice}
        increasePrice={increasePrice}
        decreasePrice={decreasePrice}
        demand={demand}
        makeClips={makeClips}
        wire={wire}
      />
      <br />
      <br />
      <Marketing
        marketing={marketing}
        increaseMarketing={increaseMarketing}
        marketingPrice={marketingPrice}
        cash={cash}
      />
      <br />
      <br />
      <Manufacturing
        wire={wire}
        wirePrice={wirePrice}
        cash={cash}
        clipsPerSecond={clipsPerSecond}
        buyWire={buyWire}
      />
    </>
  );
};

export default App;
