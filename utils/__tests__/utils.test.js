import { getDecendantTasksKeys } from '../utils';

describe('getDecendantTasksKeys', () => {
  let tasks;
  beforeEach(() => {
    tasks = {
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
  });

  it('Should mark decendants as done correctly when there is no subtask', () => {
    const decendants = getDecendantTasksKeys(tasks, 'subtask3ID');
    expect(decendants.length).toEqual(0);
  });

  it('Should mark decendants as done correctly when there is one subtask', () => {
    const decendants = getDecendantTasksKeys(tasks, 'task1ID');
    expect(decendants).toEqual(expect.arrayContaining(['subtask1ID']));
    expect(decendants).not.toEqual(expect.arrayContaining(['maintask', 'task1ID', 'task2ID', 'subtask2ID', 'subtask3ID']));
  });

  it('Should mark decendants as done correctly when there are subtasks that has subtaks, and so on', () => {
    const decendants = getDecendantTasksKeys(tasks, 'maintask');
    expect(decendants).toEqual(expect.arrayContaining(['task1ID', 'subtask1ID', 'task2ID', 'subtask2ID', 'subtask3ID']));
    expect(decendants).not.toEqual(expect.arrayContaining(['maintask']));
  });
});
