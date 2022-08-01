import React, {useState} from 'react';
import './Counter.css'
import axios from 'axios'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [people, setPeople] = useState<string[]>([]);

    function addNewRandomPerson(){                
        axios.get('https://randomuser.me/api?nat=tr&inc=name').then(res =>{
            let person = res.data.results[0].name.first + " " + res.data.results[0].name.last;
            console.log('Adding new person:' + person);
            setPeople(prevPeople  => [...prevPeople, person]);
        })
    }

    function removeLastPerson(){
        setPeople(people.slice(0, -1));
    }

    return (
        <>
            <h1 data-testid="header">Counter</h1>
            <button onClick={() => {
                setCount((prevState) => prevState-1)
                removeLastPerson();
            }}>-</button>
            <span
                style={{padding: 10, fontSize: 25}}
                role="count"
                className={`${count > -1 ? "green":"red"}`}
            >
                {count}
            </span>
            <button onClick={() => {
                setCount((prevState) => prevState+1)
                if(count>=0){
                    addNewRandomPerson();
                }
            }}>+</button>

            {people.map((person, i) => {return (
                <span key={i} style={{fontSize: 25}} role="names" className="green">
                    {person}
                </span>
            )})}
        </>
    );
};

export default Counter;