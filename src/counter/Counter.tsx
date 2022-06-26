import React, {useState} from 'react';
import './Counter.css'

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1 data-testid="header">Counter</h1>
            <button onClick={() => setCount((prevState) => prevState-1)}>-</button>
            <span
                style={{padding: 10, fontSize: 25}}
                role="count"
                className={`${count > -1 ? "green":"red"}`}
            >
                {count}
            </span>
            <button onClick={() => setCount((prevState) => prevState+1)}>+</button>
        </>
    );
};

export default Counter;