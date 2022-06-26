import React, {FormEventHandler, useState } from 'react';


interface FormProps {
    onSubmit: FormEventHandler<HTMLFormElement>
}

const Form = (props: FormProps) => {

    const [name, setName] = useState('');

    return (
        <div>
            <form onSubmit={event => props.onSubmit(event)}>
                <input
                    placeholder="name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    type='text'
                    name="Name"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;