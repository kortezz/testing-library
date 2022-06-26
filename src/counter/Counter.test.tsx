import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Counter from "./Counter";

describe('Counter', () => {

    test('shows header text', () => {
        render(<Counter />);

        expect(screen.getByTestId("header")).toBeInTheDocument();
        expect(screen.getByTestId("header")).toHaveTextContent("Counter");
    });

    test('has two buttons', () => {
        render(<Counter />);

        expect(screen.getAllByRole("button")).toHaveLength(2);
    });

    test('has +/- buttons', () => {
        render(<Counter />);

        expect(screen.getAllByRole("button").at(0)).toHaveTextContent("-");
        expect(screen.getAllByRole("button").at(1)).toHaveTextContent("+");
    });

    test('shows default color for count text', () => {
        render(<Counter />);

        expect(screen.getByRole("count")).toHaveClass("green");
    });

    test('shows green color when + button is clicked then count value will be 1', () => {
        render(<Counter />);

        fireEvent.click(screen.getByText("+"));

        expect(screen.getByRole("count")).toHaveClass("green");
        expect(screen.getByRole("count")).toHaveTextContent("1");
    });

    test('shows red color when - button is clicked then count value will be -1', () => {
        render(<Counter />);

        fireEvent.click(screen.getByText("-"));

        expect(screen.getByRole("count")).toHaveClass("red");
        expect(screen.getByRole("count")).toHaveTextContent("-1");
    });
})