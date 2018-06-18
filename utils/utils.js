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


export default {
  getDecendantTasksKeys,
};
