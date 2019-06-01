import React from 'react';

const Marketing = props => {
  const { marketing, increaseMarketing, marketingPrice, cash } = props;

  return (
    <>
      Marketing Level {marketing}
      <br />
      <button onClick={increaseMarketing} disabled={cash < marketingPrice}>
        Increase Marketing Level
      </button>
      &nbsp; Cost: ${marketingPrice.toFixed(2)}
    </>
  );
};

export default Marketing;
