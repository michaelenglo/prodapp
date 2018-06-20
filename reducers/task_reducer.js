import { getDecendantTasksKeys, getParentTaskKey } from '../utils/utils';

const seed = {
  maintask: {
    id: 'maintask',
    label: 'Throw a party',
    subtasks: ['task1ID', 'task2ID'],
    isRootTask: true,
    done: false,
  },
  task1ID: {
    id: 'task1ID',
    label: 'Call friends',
    subtasks: ['subtask1ID'],
    isRootTask: false,
    done: false,
  },
  subtask1ID: {
    id: 'subtask1ID',
    label: 'Call Lucy',
    subtasks: [],
    isRootTask: false,
    done: false,
  },
  task2ID: {
    id: 'task2ID',
    label: 'Prepare for the party',
    subtasks: ['subtask2ID', 'subtask3ID'],
    isRootTask: false,
    done: false,
  },
  subtask2ID: {
    id: 'subtask2ID',
    label: 'Buy food and drinks',
    subtasks: [],
    isRootTask: false,
    done: false,
  },
  subtask3ID: {
    id: 'subtask3ID',
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

      getDecendantTasksKeys(state, action.taskKey).forEach((decendantKey) => {
        newState[decendantKey] = {
          ...(state[decendantKey]),
          done: true,
        };
      });

      return newState;
    }

    case 'DELETE_TASK': {
      const newState = { ...state };

      const parentTaskKey = getParentTaskKey(state, action.taskKey);

      // Delete all decendant tasks
      newState[action.taskKey].subtasks.forEach((decendantKey) => {
        delete newState[decendantKey];
      });

      // If parent task can be found
      if (parentTaskKey !== null) {
        // remove from parent
        newState[parentTaskKey].subtasks = newState[parentTaskKey].subtasks.filter(subtaskKey =>
          subtaskKey !== action.taskKey);
      }

      // delete the task
      delete newState[action.taskKey];

      return newState;
    }

    default: {
      return state;
    }
  }
};

export default tasks;
