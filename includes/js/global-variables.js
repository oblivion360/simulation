class Settings {
  Predictors = [
    {
      predId: 1,
      status: 1,
      name: 'Company Experience',
      type: 1,
      start: 1,
      end: 10,
      add: 1,
      textSingular: 'Year',
      testPlural: 'Years',
    },
    {
      predId: 2,
      status: 1,
      name: 'Performance Rating',
      type: 1,
      start: 1,
      end: 5,
      add: 1,
      textSingular: 'Score',
      testPlural: 'Scores',
    },
    {
      predId: 3,
      status: 1,
      name: 'Integrity Test',
      type: 1,
      start: 1,
      end: 10,
      add: 1,
      textSingular: 'Score',
      testPlural: 'Score',
    },
    {
      predId: 4,
      status: 1,
      name: 'Cognitive Ability test',
      type: 1,
      start: 5,
      end: 100,
      add: 5,
      textSingular: '%',
      testPlural: '%',
    },
    {
      predId: 5,
      status: 1,
      name: 'Interview Rating',
      type: 1,
      start: 5,
      end: 100,
      add: 5,
      textSingular: '%',
      testPlural: '%',
    },
    {
      predId: 6,
      status: 1,
      name: 'University Degree',
      type: 2,
      start: 'Yes',
      end: 'No',
    },
    {
      predId: 7,
      status: 1,
      name: 'Background Check',
      type: 2,
      start: 'Pass',
      end: 'Fail',
    },
    {
      predId: 8,
      status: 1,
      name: 'Drug Test',
      type: 2,
      start: 'Pass',
      end: 'Fail',
    },
    {
      predId: 9,
      status: 1,
      name: 'Drug Test',
      type: 2,
      start: 'Pass',
      end: 'Fail',
    },
  ];

  Stages = [
    {
      stageId: 1,
      name: 'Stage 1',
      other: 'initial',
      status: 1,
    },
    {
      stageId: 2,
      name: 'Stage 2',
      other: 'substantive',
      status: 2,
    },
    {
      stageId: 3,
      name: 'Stage 3',
      other: 'discretionary',
      status: 2,
    },
    {
      stageId: 4,
      name: 'Stage 4',
      other: 'contingent',
      status: 2,
    },
    {
      stageId: 5,
      name: 'Stage 5',
      other: 'review',
      status: 2,
    },
    {
      stageId: 6,
      name: 'Stage 6',
      other: 'final',
      status: 2,
    },
  ];

  // predId, value, stage
  Computations = [];

  // candidate, predId, value
  Candidates = [
    {
      candidate: 'A',
      score: [
        {
          predId: 1,
          type: 1,
          value: 12,
        },
        {
          predId: 2,
          type: 1,
          value: 4,
        },
        {
          predId: 7,
          type: 2,
          value: 'Pass',
        },
        {
          predId: 8,
          type: 2,
          value: 'Pass',
        },
      ],
    },
    {
      candidate: 'B',
      score: [
        {
          predId: 1,
          type: 1,
          value: 4,
        },
        {
          predId: 2,
          type: 1,
          value: 1,
        },
        {
          predId: 7,
          type: 2,
          value: 'Fail',
        },
        {
          predId: 8,
          type: 2,
          value: 'Fail',
        },
      ],
    },
  ];
}

class Simulation {
  constructor(predId, value, stage) {
    this.predId = predId;
    this.value = value;
    this.stage = stage;
  }
}

const Set = new Settings();
