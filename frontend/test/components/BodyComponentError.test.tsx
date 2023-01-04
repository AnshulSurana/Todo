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
        json: () => Promise.reject(MockDoneData),
        ok: false
    }),
    createNewTask: () => Promise.reject({
        json: () => Promise.reject(MockDoneData),
        ok: false
    }),
    deleteCardFromDoneList: () => Promise.resolve({
        json: () => Promise.reject(MockDoneData),
        ok: false
    })
}));


describe('Body component', () => {
    beforeEach(async () => {
        window.localStorage.setItem('isLoggedIn', 'someValue');
        await act( async () => render(<BodyComponent />));
    })
    it('Should throw error when Delete Done Task fails', async () => {
        // @ts-ignore
        global.fetch = jest.fn(() =>
            Promise.reject({
                error: 'Something went wrong',
            })
        );
        await waitFor(() => {
            expect(screen.getAllByTestId('doneElements').length).toEqual(10);
            expect(screen.getAllByTestId('todoElements').length).toEqual(8);
        });
        const doneTaskList = screen.getAllByTestId('doneElements');
        const deleteIcon = doneTaskList[0].lastChild;
        fireEvent.click(deleteIcon, {});
        await waitFor(() => {
            expect(screen.getByText('Error Deleting Task')).toBeVisible();
        });
    });
    it('Should throw error when create new Task fails', async () => {
        const taskInputField = screen.getByTestId('taskInputField');
        fireEvent.change(taskInputField, {
            target: { value: "new value" }
        });
        const submitTaskButton = screen.getByTestId('submitTaskButton');
        fireEvent.click(submitTaskButton, {});
        await waitFor(() => {
            expect(screen.getByText('Error Creating Task')).toBeVisible();
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
            expect(screen.getByText('Error Marking Task as Done')).toBeVisible();
        });
    });
});
