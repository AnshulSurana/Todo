import { API } from './contants';

export const createNewTask = (value) => fetch(API.CREATE_NEW_TASK, {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ name: value }),
});
export const markTaskAsComplete = (value) => fetch(API.MARK_TASK, {
  method: 'PUT',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ cardId: value }),
});

export const deleteCardFromDoneList = (value) => fetch(API.DELETE_CARD, {
  method: 'DELETE',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
  body: JSON.stringify({ cardId: value }),
});

export const getTodoListCards = () => fetch(API.GET_CARDS_IN_TODO);

export const getDoneListCards = () => fetch(API.GET_CARDS_IN_DONE);
