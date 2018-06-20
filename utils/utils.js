// This function is meant to be recursive function. Do not pass your own
// decendantsTaskKeys unless you know what  you are doing.
export const getDecendantTasksKeys = (state, rootTaskKey, decendantsTaskKeys = []) => {
  // eslint-disable-next-line no-param-reassign
  decendantsTaskKeys = decendantsTaskKeys.concat(state[rootTaskKey].subtasks);

  state[rootTaskKey].subtasks.forEach((subtaskKey) => {
    // eslint-disable-next-line no-param-reassign
    decendantsTaskKeys = getDecendantTasksKeys(state, subtaskKey, decendantsTaskKeys);
  });

  return decendantsTaskKeys;
};

// Only use this function when state is not empty
export const getParentTaskKey = (state, childTaskKey) => {
  const parentKey = Object.values(state).find(task => task.subtasks.includes(childTaskKey));

  return parentKey ? parentKey.id : null;
};

export default {
  getDecendantTasksKeys,
};
