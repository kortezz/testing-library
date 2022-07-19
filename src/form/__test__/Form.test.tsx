import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import '../Form';
import Form from "../Form";

describe('Form', () => {
   it('exists form', () => {
     render(<Form onSubmit={jest.fn()} />)

     expect(screen.getByTestId("form")).toBeInTheDocument();
   });

  it('exists name', () => {
     render(<Form onSubmit={jest.fn()} />)

     expect(screen.getByPlaceholderText("name")).toBeInTheDocument();
   });

  it('exists password', () => {
     render(<Form onSubmit={jest.fn()} />)

     expect(screen.getByPlaceholderText("password")).toBeInTheDocument();
   });

  it('required buttons', async () => {
    let onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit}/>)

    expect(screen.getByPlaceholderText('name')).toHaveAttribute("required")
    expect(screen.getByPlaceholderText('password')).toHaveAttribute("required")
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  });

  it('check onSubmit', () => {
    let onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit}/>)

    let button = screen.getByRole('button');
    fireEvent.click(button)

    expect(button.textContent).toBe('Submit');
    expect(onSubmit).toBeCalledTimes(1);
  })

});
