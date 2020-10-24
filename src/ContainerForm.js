import React, { useState } from 'react';
import Input from './Input';

const initialEntryState = {
  recordName: '',
  artistName: '',
  description: '',
};

const ContainerForm = ({ onSubmit }) => {
  const [entry, setEntry] = useState(initialEntryState);

  const onChangeHandler = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const onContainerFormSubmitHandler = (e) => {
    e.preventDefault();

    if (!entry.recordName || !entry.artistName) {
      return;
    }

    onSubmit({ ...entry });
    setEntry(initialEntryState);
  };

  return (
    <form onSubmit={onContainerFormSubmitHandler}>
      {/* <label htmlFor='recordName'></label>
      <input
        id='recordName'
        name='recordName'
        onChange={onChangeHandler}
        value={entry.recordName}
      /> */}
      <Input
        labelText='Record Name'
        name='recordName'
        onChange={onChangeHandler}
        value={entry.recordName}
      />
      <Input
        labelText='Artist Name'
        name='artistName'
        onChange={onChangeHandler}
        value={entry.artistName}
      />
      <Input
        type='textarea'
        labelText='description'
        name='description'
        onChange={onChangeHandler}
        value={entry.description}></Input>
      <button type='submit'>Add</button>
    </form>
  );
};

export default ContainerForm;
