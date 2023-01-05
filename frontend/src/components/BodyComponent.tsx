import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import {
  createNewTask,
  deleteCardFromDoneList,
  getDoneListCards,
  getTodoListCards,
  markTaskAsComplete,
} from '../api';
import {
  AiOutlineSendComponent,
  CheckboxComponent,
  FlexComponent,
  G1R1,
  G2R1,
  G3R1,
  GridColumn,
  GridComponent,
  GridRow,
  InputField,
  LabelStyle,
  ListInput,
  ListInputContainer,
  UnorderedDoneListComponent,
  UnorderedListComponent,
  TodoEmptyPlaceholder
} from './styles';
import {
  AddTaskText, TodoText, DoneText, SessionKey, TOAST_MESSAGES, SessionError,
} from '../contants';
import { TodoCard, DoneCard } from '../Type';
import TodoListComponent from './TodoListComponent';
import DoneListComponent from './DoneListComponent';

const BodyComponent = () => {
  const [todoCards, setTodoCards] = useState<Array<TodoCard>>();
  const [doneCards, setDoneCards] = useState<Array<DoneCard>>();
  const [taskName, setTaskName] = useState<string>('');
  const dataFetchedRef = useRef(false);

  const handleResponse = async (response) => {
    if (response.ok) {
      const json = await response.json();
      return json;
    }
    const error = await response.json();
    throw new Error(error.message);
  };

  const handleError = (error) => {
    if (error.message === 'invalid id') {
      window.localStorage.removeItem(SessionKey);
      toast.error(SessionError, { position: toast.POSITION.TOP_RIGHT });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      toast.error(error.message, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const fetchCards = async () => {
    getTodoListCards()
      .then(async (response) => {
        const result = await handleResponse(response);
        setTodoCards(result);
      })
      .catch((error) => {
        handleError(error);
      });
    getDoneListCards()
      .then(async (response) => {
        const result = await handleResponse(response);
        setDoneCards(result);
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    if (!dataFetchedRef.current && localStorage.getItem(SessionKey) !== null) {
      dataFetchedRef.current = true;
      fetchCards();
    }
  }, []);

  const submitTask = (e) => {
    e.preventDefault();
    setTaskName('');
    createNewTask(taskName).then(async (response) => {
      await handleResponse(response);
      toast.success(TOAST_MESSAGES.CREATED_TASK_SUCCESS, { position: toast.POSITION.TOP_RIGHT });
      fetchCards();
    }).catch((error) => {
      toast.error(TOAST_MESSAGES.CREATED_TASK_ERROR, { position: toast.POSITION.TOP_RIGHT });
      handleError(error);
    });
  };

  const moveTaskToDone = (e, id) => {
    if (e.target.style) {
      e.target.style.setProperty('text-decoration', 'line-through');
      e.target.style.setProperty('transition', '2000ms');
    }
    markTaskAsComplete(id).then(async (response) => {
      await handleResponse(response);
      toast.success(TOAST_MESSAGES.MARK_TASK_SUCCESS, { position: toast.POSITION.TOP_RIGHT });
      fetchCards();
    }).catch((error) => {
      toast.error(TOAST_MESSAGES.MARK_TASK_ERROR, { position: toast.POSITION.TOP_RIGHT });
      handleError(error);
    });
  };

  const deleteCard = (id) => {
    deleteCardFromDoneList(id).then(async (response) => {
      await handleResponse(response);
      toast.success(TOAST_MESSAGES.DELETE_TASK_SUCCESS, { position: toast.POSITION.TOP_RIGHT });
      fetchCards();
    }).catch((error) => {
      toast.error(TOAST_MESSAGES.DELETE_TASK_ERROR, { position: toast.POSITION.TOP_RIGHT });
      handleError(error);
    });
  };

  return (
    <GridComponent>
      <ToastContainer />
      <FlexComponent>
        <GridRow>
          <GridColumn>
            <G1R1>
              <LabelStyle><span>{ AddTaskText }</span></LabelStyle>
              <ListInput>
                <ListInputContainer onSubmit={submitTask}>
                  <InputField
                    data-testid="taskInputField"
                    id="taskInput"
                    onChange={(e) => setTaskName(e.target.value)}
                    value={taskName}
                  />
                  <span>
                    <input type="submit" />
                    <AiOutlineSendComponent data-testid="submitTaskButton" onClick={submitTask} />
                  </span>
                </ListInputContainer>
              </ListInput>
            </G1R1>
            <G2R1>
              <LabelStyle><span>{ TodoText }</span></LabelStyle>
              <TodoListComponent todoCards={ todoCards } moveTaskToDone={ moveTaskToDone } />
            </G2R1>
            <G3R1>
              <LabelStyle><span>{ DoneText }</span></LabelStyle>
              <DoneListComponent doneCards={ doneCards } deleteCard={ deleteCard } />
            </G3R1>
          </GridColumn>
        </GridRow>
      </FlexComponent>
    </GridComponent>
  );
};

export default BodyComponent;
