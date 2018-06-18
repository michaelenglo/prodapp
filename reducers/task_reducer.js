

const seed = {
  maintask: {
    label: 'Throw a party',
    subtasks: ['task1ID', 'task2ID'],
    isRootTask: true,
    done: false,
  },
  task1ID: {
    label: 'Call friends',
    subtasks: ['subtask1ID'],
    isRootTask: false,
    done: false,
  },
  subtask1ID: {
    label: 'Call Lucy',
    subtasks: [],
    isRootTask: false,
    done: false,
  },
  task2ID: {
    label: 'Prepare for the party',
    subtasks: ['subtask2ID', 'subtask3ID'],
    isRootTask: false,
    done: false,
  },
  subtask2ID: {
    label: 'Buy food and drinks',
    subtasks: [],
    isRootTask: false,
    done: false,
  },
  subtask3ID: {
    label: 'Buy cups and plates',
    subtasks: [],
    isRootTask: false,
    done: false,
  },
};

const tasks = (state = seed, action) => {
  switch (action.type) {
    case 'MARK_TASK_AS_DONE': {
      const newState = { ...state };

      newState[action.taskKey] = {
        ...(state[action.taskKey]),
        done: true,
      };

      return newState;
    }

    default: {
      return state;
    }
  }
};

export default tasks;
