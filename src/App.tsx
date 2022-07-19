import React, {FormEvent} from 'react';
import './App.css';
import Counter from "./counter/Counter";
import Form from './form/Form';

function App() {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('onSubmit');
    }
  return (
    <div className="App">
      <header className="App-header">
        {/*<Counter />*/}
        <Form onSubmit={event => onSubmit(event)} />
      </header>
    </div>
  );
}

export default App;
