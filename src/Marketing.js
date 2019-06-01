import React from 'react';

const Marketing = props => {
  const { marketing, increaseMarketing, marketingPrice, cash } = props;

  return (
    <>
      Marketing Level {marketing}
      <br />
      <button
        onClick={increaseMarketing}
        disabled={cash < marketingPrice ? true : false}
      >
        Increase Marketing Level
      </button>
      &nbsp; Cost: ${marketingPrice}
    </>
  );
};

export default Marketing;
