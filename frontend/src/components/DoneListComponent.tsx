import React from 'react';
import { DoneCard } from '../Type';
import {
    UnorderedDoneListComponent,
    TodoEmptyPlaceholder,
    DoneListStyle
} from './styles';
import { EmptyDone } from '../contants';
import { AiOutlineDelete } from 'react-icons/ai';

interface DoneListProps {
    doneCards: Array<DoneCard>;
    deleteCard: Function;
}
const DoneListComponent = ({ doneCards, deleteCard }: DoneListProps) => {
    if (doneCards && doneCards.length > 0) {
        return (
            <UnorderedDoneListComponent data-testid="unorderedDoneListComponent">
                { doneCards && doneCards.map((card) => (
                    <DoneListStyle data-testid="doneElements" key={card.id}>
                        <span>{card.name}</span>
                        <span>
                            <AiOutlineDelete data-testid="deleteButtons" onClick={() => deleteCard(card.id)} />
                        </span>
                    </DoneListStyle>
                ))}
            </UnorderedDoneListComponent>
        )
    } else {
        return (
            <TodoEmptyPlaceholder>{ EmptyDone }</TodoEmptyPlaceholder>
        );
    }
};

export default DoneListComponent;
