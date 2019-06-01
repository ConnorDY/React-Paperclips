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
  const [manualClips, setManualClips] = useState(0);

  const [demand, setDemand] = useState(1);
  const [demandFactor, setDemandFactor] = useState(1);
  const [marketing, setMarketing] = useState(1);
  const [marketingPrice, setMarketingPrice] = useState(100);

  const [wire, setWire] = useState(1000);
  const [wirePrice, setWirePrice] = useState(20);
  const [wirePerSpool, setWirePerSpool] = useState(1000);
  const [wireCounter, setWireCounter] = useState(0);

  const [clippers, setClippers] = useState(0);
  const [clipperPrice, setClipperPrice] = useState(5);

  // make single clip
  const makeOneClip = () => {
    setManualClips(manualClips + 1);
  };

  // make clips
  const makeClips = (num, _clips) => {
    if (num > wire) num = wire;

    _clips += num;
    setWire(wire - num);

    return [num, _clips];
  };

  // sell clips
  const sellClips = (num, _clips) => {
    if (num > _clips) num = _clips;

    _clips -= num;
    const profit = clipPrice * num;
    setCash(cash + profit);

    return [profit, _clips];
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
    setMarketingPrice(marketingPrice * 2);
  };

  // buy wire
  const buyWire = () => {
    setWire(wire + wirePerSpool);
    setCash(cash - wirePrice);
  };

  // buy auto clipper
  const buyClipper = () => {
    setClippers(clippers + 1);
    setCash(cash - clipperPrice);
    setClipperPrice(1.1 ** (clippers + 1) + 5);
  };

  // tick every second
  useInterval(() => {
    // temp clip count
    let _clips = clips + manualClips;

    // auto clippers
    let autoClips = 0;
    if (clippers > 0) {
      [autoClips, _clips] = makeClips(clippers, _clips);
    }

    // sell clips at a rate according to the market demand
    let profit = 0;
    if (_clips > 0)
      [profit, _clips] = sellClips(Math.floor(0.7 * demand ** 1.15), _clips);

    // update unsold and total clips
    setClips(_clips);
    setTotalClips(totalClips + autoClips + manualClips);

    // average cash per second
    const profits = [...profitList];

    if (profits.unshift(profit) > 5) profits.pop();
    setProfitList(profits);

    const total = profits.reduce((tot, v) => tot + v, 0);
    setCashPerSecond(total / profits.length);

    // wire price
    if (Math.random() < 0.35) {
      setWireCounter(wireCounter + 0.25);
      setWirePrice(Math.ceil(20 + 6 * Math.sin(wireCounter + 0.25)));
    }

    // clips per second
    setClipsPerSecond(manualClips + autoClips);
    setManualClips(0);
  }, 1000);

  // re-calculate the demand whenever the price or market demand factor changes
  useEffect(calcDemand, [clipPrice, demandFactor, marketing]);

  // render
  return (
    <>
      <Business
        totalClips={totalClips + manualClips}
        clips={clips + manualClips}
        cash={cash}
        cashPerSecond={cashPerSecond}
        clipPrice={clipPrice}
        increasePrice={increasePrice}
        decreasePrice={decreasePrice}
        demand={demand}
        wire={wire}
        makeOneClip={makeOneClip}
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
        clippers={clippers}
        buyClipper={buyClipper}
        clipperPrice={clipperPrice}
      />
    </>
  );
};

export default App;
