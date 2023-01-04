import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect'
import { screen, render } from '@testing-library/react';
import App from '../src/App';

jest.mock('../src/components/HeaderComponent', () =>
    jest.fn(() => <div data-testid="mockedHeaderComponent" />)
);

jest.mock('../src/components/BodyComponent', () =>
    jest.fn(() => <div data-testid="mockedBodyComponent" />)
);

describe('App component', () => {
    it('Should render Header and Body Component', () => {
        render(<App />);

        expect(screen.getByTestId('mockedHeaderComponent')).toBeInTheDocument();
        expect(screen.getByTestId('mockedBodyComponent')).toBeInTheDocument();
    });
});
