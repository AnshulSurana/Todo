import React from 'react';
import { TodoCard } from '../Type';
import { EmptyTodo } from '../contants';
import {
    UnorderedListComponent,
    TodoEmptyPlaceholder,
    TodoListStyle,
    CheckboxComponent
} from './styles';

interface TodoListProps {
    todoCards: Array<TodoCard>;
    moveTaskToDone: Function;
}

const TodoListComponent = ({ todoCards, moveTaskToDone}: TodoListProps) => {
    if (todoCards && todoCards.length > 0) {
        return (
            <UnorderedListComponent data-testid="unorderedTodoListComponent">
                { todoCards && todoCards.map((card) => (
                    <TodoListStyle data-testid="todoElements" id={card.id} key={card.id}>
                        <CheckboxComponent data-testid="checkBoxElement" onChange={(e) => moveTaskToDone(e, card.id)} />
                        <span>{card.name}</span>
                    </TodoListStyle>
                ))}
            </UnorderedListComponent>
        )
    } else {
        return (
            <TodoEmptyPlaceholder>{ EmptyTodo }</TodoEmptyPlaceholder>
        );
    }
};

export default TodoListComponent;
