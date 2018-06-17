

const seed = {
  maintask: {
    label: 'Throw a party',
    subtasks: ['task1ID', 'task2ID'],
    isRootTask: true,
  },
  task1ID: {
    label: 'Call friends',
    subtasks: ['subtask1ID'],
    isRootTask: false,
  },
  subtask1ID: {
    label: 'Call Lucy',
    subtasks: [],
    isRootTask: false,
  },
  task2ID: {
    label: 'Prepare for the party',
    subtasks: ['subtask2ID', 'subtask3ID'],
    isRootTask: false,
  },
  subtask2ID: {
    label: 'Buy food and drinks',
    subtasks: [],
    isRootTask: false,
  },
  subtask3ID: {
    label: 'Buy cups and plates',
    subtasks: [],
    isRootTask: false,
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
