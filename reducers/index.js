import { combineReducers } from 'redux';
import tasks from './task_reducer';
import ui from './ui_reducer';

const root = combineReducers({
  tasks,
  ui,
});

export default root;
