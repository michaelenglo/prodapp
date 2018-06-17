import { combineReducers } from 'redux';
import tasks from './task_reducer';

const root = combineReducers({
  tasks,
});

export default root;
