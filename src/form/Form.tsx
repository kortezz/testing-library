import React, {FormEventHandler, useState } from 'react';


interface FormProps {
    onSubmit: FormEventHandler<HTMLFormElement>
}

const Form = (props: FormProps) => {

    const [name, setName] = useState('');
    const [selected, setSelected] = useState('one');
    const [checkbox, setCheckbox] = useState(false);

    return (
        <>
            {console.log('div')}
            <form data-testid="form" onSubmit={event => props.onSubmit(event)}
                  style={{display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: '10px'}}>
                <input
                    placeholder="name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    type='text'
                    name="Name"
                    required
                />
              <input
                    placeholder="password"
                    type='password'
                    name="Password"
                    required
                />
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option value={"default"} disabled>
                  Choose an option
                </option>
                <option value={"one"}>One</option>
                <option value={"two"}>Two</option>
                <option value={"three"}>Three</option>
              </select>
              <input type="checkbox" defaultChecked={checkbox}
                     onChange={(e) => {
                       setCheckbox((prevState) => !prevState)
                       console.log(checkbox)
                     }
              } />
              <span data-testid="selected-value">{selected}</span>
              <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default Form;
