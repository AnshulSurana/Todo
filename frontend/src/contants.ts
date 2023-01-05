export const HeaderText = 'Epilot- Todo by Trello';
export const AddTaskText = 'Add a Task';
export const TodoText = 'ToDo';
export const DoneText = 'Done';
export const SessionKey = 'isLoggedIn';
export const SessionError = 'SESSION key expired please re login';
export const EmptyDone = 'Do some tasks and mark them done!';
export const EmptyTodo = 'Great ! no pending tasks';

export const API = {
  LOGIN: 'http://localhost:3000/login',
  CREATE_NEW_TASK: 'http://localhost:3000/createNewTask',
  MARK_TASK: 'http://localhost:3000/markTaskAsDone',
  DELETE_CARD: 'http://localhost:3000/deleteCard',
  GET_CARDS_IN_TODO: 'http://localhost:3000/getCardsInTodoList',
  GET_CARDS_IN_DONE: 'http://localhost:3000/getCardsInDoneList',
};

export const TOAST_MESSAGES = {
  CREATED_TASK_SUCCESS: 'Successfully Created Task',
  MARK_TASK_SUCCESS: 'Successfully Marked Task as Done',
  DELETE_TASK_SUCCESS: 'Successfully Deleted Task',
  CREATED_TASK_ERROR: 'Error Creating Task',
  MARK_TASK_ERROR: 'Error Marking Task as Done',
  DELETE_TASK_ERROR: 'Error Deleting Task',
};
