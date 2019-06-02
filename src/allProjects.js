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
  },
  {
    title: 'Catchy Jingle',
    priceTag: '(45 creat, 4,500 ops)',
    desc: 'Double marketing effectiveness',
    trigger: state => {
      return state.demandFactor >= 1.5;
    },
    cost: state => {
      return state.ops >= 4500 && state.creativity >= 45;
    },
    effect: state => {
      state.setOps(state.ops - 4500);
      state.setCreativity(state.creativity - 45);
      state.setDemandFactor(state.demandFactor * 2);
    }
  },
  {
    title: 'Limerick',
    priceTag: '(10 creat)',
    desc: 'Algorithmically-generated poem (+1 Trust)',
    trigger: state => {
      return state.creativity >= 10;
    },
    cost: state => {
      return state.creativity >= 10;
    },
    effect: state => {
      state.setCreativity(state.creativity - 10);
      state.setTrust(state.trust + 1);
    }
  },
  {
    title: 'Creativity',
    priceTag: '(1,000 ops)',
    desc: 'Use idle operations to generate new problems and new solutions',
    trigger: state => {
      return state.ops >= state.memory * 1000;
    },
    cost: state => {
      return state.ops >= 1000;
    },
    effect: state => {
      state.setOps(state.ops - 1000);
      state.setCreativityFlag(true);
    }
  },
  {
    title: 'Lexical Processing',
    priceTag: '(50 creat)',
    desc: 'Gain ability to interpret and understand human language (+1 Trust)',
    trigger: state => {
      return state.creativity >= 50;
    },
    cost: state => {
      return state.creativity >= 50;
    },
    effect: state => {
      state.setCreativity(state.creativity - 50);
      state.setTrust(state.trust + 1);
    }
  },
  {
    title: 'Combinatory Harmonics',
    priceTag: '(100 creat)',
    desc: 'Daisy, Daisy, give me your answer do... (+1 Trust)',
    trigger: state => {
      return state.creativity >= 100;
    },
    cost: state => {
      return state.creativity >= 100;
    },
    effect: state => {
      state.setCreativity(state.creativity - 100);
      state.setTrust(state.trust + 1);
    }
  },
  {
    title: 'The Hadwiger Problem',
    priceTag: '(150 creat)',
    desc: 'Cubes within cubes within cubes... (+1 Trust)',
    trigger: state => {
      return state.creativity >= 150;
    },
    cost: state => {
      return state.creativity >= 150;
    },
    effect: state => {
      state.setCreativity(state.creativity - 150);
      state.setTrust(state.trust + 1);
      state.setHadwigerFlag(true);
    }
  },
  {
    title: 'The T\xF3th Sausage Conjecture',
    priceTag: '(200 creat)',
    desc: 'Tubes within tubes within tubes... (+1 Trust)',
    trigger: state => {
      return state.creativity >= 200;
    },
    cost: state => {
      return state.creativity >= 200;
    },
    effect: state => {
      state.setCreativity(state.creativity - 200);
      state.setTrust(state.trust + 1);
    }
  },
  {
    title: 'Hadwiger Clip Diagrams',
    priceTag: '(6,000 ops)',
    desc: 'Increases AutoClipper performance by an additional 500%',
    trigger: state => {
      return state.hadwigerFlag;
    },
    cost: state => {
      return state.ops >= 6000;
    },
    effect: state => {
      state.setOps(state.ops - 6000);
      state.setClipperBoost(state.clipperBoost + 5);
    }
  }
];

export default allProjects;
