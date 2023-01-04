import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react';
import HeaderComponent from '../../src/components/HeaderComponent';


// @ts-ignore
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ login: { trello: true } }),
    })
);
const url = "http://dummy.com";
Object.defineProperty(window, 'location', {
    value: {
        href: url
    }
});
describe('Header component', () => {
    it('Should render Header Component', () => {
        render(<HeaderComponent />);
        expect(screen.getByTestId('headerName')).toBeInTheDocument();
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/login');
        expect(window.location.href).toEqual(url);
    });
});
