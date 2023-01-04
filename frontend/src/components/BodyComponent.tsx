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
  DoneListComponent,
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
  TodoListComponent,
  UnorderedDoneListComponent,
  UnorderedListComponent,

} from './styles';
import {
  AddTaskText, TodoText, DoneText, SESSION_KEY, TOAST_MESSAGES, SESSION_ERROR,
} from '../contants';

const BodyComponent = () => {
  const [todoCards, setTodoCards] = useState<Array<any>>();
  const [doneCards, setDoneCards] = useState<Array<any>>();
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
      window.localStorage.removeItem(SESSION_KEY);
      toast.error(SESSION_ERROR, { position: toast.POSITION.TOP_RIGHT });
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
    if (!dataFetchedRef.current && localStorage.getItem(SESSION_KEY) !== null) {
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
              <LabelStyle>{ AddTaskText }</LabelStyle>
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
              <LabelStyle>{ TodoText }</LabelStyle>
              <UnorderedListComponent data-testid="unorderedTodoListComponent">
                {todoCards && todoCards.map((card) => (
                  <TodoListComponent data-testid="todoElements" id={card.id} key={card.id}>
                    <CheckboxComponent data-testid="checkBoxElement" onChange={(e) => moveTaskToDone(e, card.id)} />
                    <span>{card.name}</span>
                  </TodoListComponent>
                ))}
              </UnorderedListComponent>
            </G2R1>
            <G3R1>
              <LabelStyle>{ DoneText }</LabelStyle>
              <UnorderedDoneListComponent data-testid="unorderedDoneListComponent">
                {doneCards && doneCards.map((card) => (
                  <DoneListComponent data-testid="doneElements" key={card.id}>
                    <span>{card.name}</span>
                    <AiOutlineDelete data-testid="deleteButtons" onClick={() => deleteCard(card.id)} />
                  </DoneListComponent>
                ))}
              </UnorderedDoneListComponent>
            </G3R1>
          </GridColumn>
        </GridRow>
      </FlexComponent>
    </GridComponent>
  );
};

export default BodyComponent;
