import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Counter from "./Counter";
import axios, { AxiosResponse } from 'axios';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';

    const server = setupServer(
        rest.get('https://randomuser.me/api?nat=tr&inc=name', (req, res, ctx) => {
            let mockedData = {"results":[{"name":{"title":"Miss","first":"Kübra","last":"Süleymanoğlu"}}],"info":{"seed":"a279f85094a753b4","results":1,"page":1,"version":"1.4"}};
            return res(ctx.json({mockedData}));
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    describe('Counter', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

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

    
    test('shows 1 person when + button is clicked once', async () => {
        server.use(
            rest.get('https://randomuser.me/api?nat=tr&inc=name', (req, res, ctx) => {
                let mockedData = {"results":[{"name":{"title":"Miss","first":"Ayse","last":"Süleymanoğlu"}}],"info":{"seed":"a279f85094a753b4","results":1,"page":1,"version":"1.4"}};
                return res(ctx.json({mockedData}));
            }),
          )

        render(<Counter />);
        fireEvent.click(screen.getByText("+"));
        await waitFor(() =>{
            expect(screen.getAllByRole("names")).toHaveLength(1);
        }) 
    });
    
})