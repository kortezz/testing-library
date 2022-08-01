import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import Counter from "./Counter";
import axios from 'axios';

    // Mock jest and set the type
    jest.mock('axios');
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    const mockedResult = {
        data: {
          results: [
            {
              name: {
                title: "Mr",
                first: "Peter",
                last: "Parker",
              },
            },
          ],
        },
      };

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
            mockedAxios.get.mockResolvedValue(mockedResult);
            render(<Counter />);

            userEvent.click(screen.getByText("+"));

            expect(screen.getByRole("count")).toHaveClass("green");
            expect(screen.getByRole("count")).toHaveTextContent("1");
        });

        test('shows red color when - button is clicked then count value will be -1', () => {
            render(<Counter />);

            userEvent.click(screen.getByText("-"));

            expect(screen.getByRole("count")).toHaveClass("red");
            expect(screen.getByRole("count")).toHaveTextContent("-1");
        });

        test('shows 1 name when + button is clicked once', async () => {
            mockedAxios.get.mockResolvedValue(mockedResult);
            render(<Counter />)

            userEvent.click(screen.getByText("+"));

            expect(await screen.findAllByRole("names")).toHaveLength(1);
        });

        test('shows 2 names when + button is clicked twice', async () => {
            mockedAxios.get.mockResolvedValue(mockedResult);
            render(<Counter />)

            userEvent.click(screen.getByText("+"));
            userEvent.click(screen.getByText("+"));

            expect(await screen.findAllByRole("names")).toHaveLength(2);
        });

    })