import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import {screen, render, waitFor, fireEvent, act} from '@testing-library/react';
import BodyComponent from '../../src/components/BodyComponent';
import { MockTodoData, MockDoneData } from '../mocks/ListData'

jest.mock('../../src/api.ts', () => ({
    ...(jest.requireActual('../../src/api.ts')),
    getTodoListCards: () => Promise.resolve({
        json: () => Promise.resolve(MockTodoData),
        ok: true
    }),
    getDoneListCards: () => Promise.resolve({
        json: () => Promise.resolve(MockDoneData),
        ok: true
    }),
    markTaskAsComplete: () => Promise.resolve({
        json: () => Promise.resolve(MockDoneData),
        ok: true
    }),
    createNewTask: () => Promise.resolve({
        json: () => Promise.resolve(MockDoneData),
        ok: true
    }),
    deleteCardFromDoneList: () => Promise.resolve({
        json: () => Promise.resolve(MockDoneData),
        ok: true
    })
}));


describe('Body component', () => {
    beforeEach(async () => {
        window.localStorage.setItem('isLoggedIn', 'someValue');
        await act( async () => render(<BodyComponent />));
    })
    it('Should render Body Component and render lists', async () => {
        expect(screen.getByTestId('taskInputField')).toBeInTheDocument();
        expect(screen.getByTestId('unorderedTodoListComponent')).toBeInTheDocument();
        expect(screen.getByTestId('unorderedDoneListComponent')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId('todoElements')[0]).toBeVisible()
            expect(screen.getAllByTestId('doneElements')[0]).toBeVisible()
            expect(screen.getAllByTestId('doneElements').length).toEqual(10);
            expect(screen.getAllByTestId('todoElements').length).toEqual(8);
        });
    });
    it('Should Mark Todo Task Done and toast should appear', async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId('doneElements').length).toEqual(10);
            expect(screen.getAllByTestId('todoElements').length).toEqual(8);
        });
        const getFirstTodoItem = screen.getAllByTestId('todoElements')[0];
        const getFirstCheckItem = getFirstTodoItem.firstChild;
        fireEvent.click(getFirstCheckItem, {});
        await waitFor(() => {
            expect(screen.getByText('Successfully Marked Task as Done')).toBeVisible();
        });
    });
    it('Should Create new Todo Task and toast should appear', async () => {
        const taskInputField = screen.getByTestId('taskInputField');
        fireEvent.change(taskInputField, {
            target: { value: "new value" }
        });
        const submitTaskButton = screen.getByTestId('submitTaskButton');
        fireEvent.click(submitTaskButton, {});
        await waitFor(() => {
            expect(screen.getByText('Successfully Created Task')).toBeVisible();
        });
    });
    it('Should Delete Done Task and toast should appear', async () => {
        await waitFor(() => {
            expect(screen.getAllByTestId('doneElements').length).toEqual(10);
            expect(screen.getAllByTestId('todoElements').length).toEqual(8);
        });
        const doneTaskList = screen.getAllByTestId('doneElements');
        const deleteIcon = doneTaskList[0].lastChild;
        fireEvent.click(deleteIcon, {});
        await waitFor(() => {
            expect(screen.getByText('Successfully Deleted Task')).toBeVisible();
        });
    });
});
