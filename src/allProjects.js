const allProjects = [
  {
    title: 'Improved AutoClippers',
    priceTag: '(750 ops)',
    desc: 'Increases AutoClipper performance by 25%',
    trigger: () => {
      return true;
    },
    cost: state => {
      return state.ops >= 750;
    },
    effect: state => {
      state.setOps(state.ops - 750);
      state.setClipperBoost(state.clipperBoost + 0.25);
    }
  },
  {
    title: 'Even Better AutoClippers',
    priceTag: '(2,500 ops)',
    desc: 'Increases AutoClipper performance by an additional 50%',
    trigger: state => {
      return state.clipperBoost >= 1.25;
    },
    cost: state => {
      return state.ops >= 2500;
    },
    effect: state => {
      state.setOps(state.op - 2500);
      state.setClipperBoost(state.clipperBoost + 0.5);
    }
  }
];

export default allProjects;
