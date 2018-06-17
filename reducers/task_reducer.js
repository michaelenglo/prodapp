

const seed = {
  maintask: {
    label: 'Throw a party',
    subtasks: ['task1ID', 'task2ID'],
  },
  task1ID: {
    label: 'Call friends',
    subtasks: ['subtask1ID'],
  },
  subtask1ID: {
    label: 'Call Lucy',
    subtasks: [],
  },
  task2ID: {
    label: 'Prepare for the party',
    subtasks: ['subtask2ID', 'subtask3ID'],
  },
  subtask2ID: {
    label: 'Buy food and drinks',
    subtasks: [],
  },
  subtask3ID: {
    label: 'Buy cups and plates',
    subtasks: [],
  },
};

const tasks = (state = seed, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

export default tasks;
