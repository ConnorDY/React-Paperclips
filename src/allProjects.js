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
      state.setOps(state.ops - 2500);
      state.setClipperBoost(state.clipperBoost + 0.5);
    }
  },
  {
    title: 'Improved Wire Extrusion',
    priceTag: '(1,750 ops)',
    desc: '50% more wire supply from every spool',
    trigger: () => {
      return true;
    },
    cost: state => {
      return state.ops >= 1750;
    },
    effect: state => {
      state.setOps(state.ops - 1750);
      state.setWirePerSpool(Math.floor(state.wirePerSpool * 1.5));
    }
  },
  {
    title: 'Optimized AutoClippers',
    priceTag: '(5,000 ops)',
    desc: 'Increases AutoClipper performance by an additional 75%',
    trigger: state => {
      return state.clipperBoost >= 1.75;
    },
    cost: state => {
      return state.ops >= 5000;
    },
    effect: state => {
      state.setOps(state.ops - 5000);
      state.setClipperBoost(state.clipperBoost + 0.75);
    }
  },
  {
    title: 'Optimized Wire Extrusion',
    priceTag: '(3,500 ops)',
    desc: '75% more wire supply from every spool',
    trigger: state => {
      return state.wirePerSpool >= 1500;
    },
    cost: state => {
      return state.ops >= 3500;
    },
    effect: state => {
      state.setOps(state.ops - 3500);
      state.setWirePerSpool(Math.floor(state.wirePerSpool * 1.75));
    }
  },
  {
    title: 'Microlattice Shapecasting',
    priceTag: '(7,500 ops)',
    desc: '100% more wire supply from every spool',
    trigger: state => {
      return state.wirePerSpool >= 2600;
    },
    cost: state => {
      return state.ops >= 7500;
    },
    effect: state => {
      state.setOps(state.ops - 7500);
      state.setWirePerSpool(Math.floor(state.wirePerSpool * 2));
    }
  },
  {
    title: 'Spectral Froth Annealment',
    priceTag: '(12,000 ops)',
    desc: '200% more wire supply from every spool',
    trigger: state => {
      return state.wirePerSpool >= 5000;
    },
    cost: state => {
      return state.ops >= 12000;
    },
    effect: state => {
      state.setOps(state.ops - 12000);
      state.setWirePerSpool(Math.floor(state.wirePerSpool * 3));
    }
  },
  {
    title: 'Quantum Foam Annealment',
    priceTag: '(15,000 ops)',
    desc: '1,000% more wire supply from every spool',
    trigger: state => {
      return state.wirePerSpool >= 15000;
    },
    cost: state => {
      return state.ops >= 15000;
    },
    effect: state => {
      state.setOps(state.ops - 15000);
      state.setWirePerSpool(Math.floor(state.wirePerSpool * 11));
    }
  },
  {
    title: 'New Slogan',
    priceTag: '(25 creat, 2,500 ops)',
    desc: 'Improve marketing effectiveness by 50%',
    trigger: () => {
      return true;
    },
    cost: state => {
      return state.ops >= 2500 && state.creativity >= 25;
    },
    effect: state => {
      state.setOps(state.ops - 2500);
      state.setCreativity(state.creativity - 25);
      state.setDemandFactor(state.demandFactor * 1.5);
    }
  }
];

export default allProjects;
