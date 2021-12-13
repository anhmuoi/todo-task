import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { add } from '../../app/todoSlice.js';
import DescriptionField from '../Commons/DescriptionField/index.jsx';
import DueDateField from '../Commons/DueDateField/index.jsx';
import PiorityField from '../Commons/PiorityField/index.jsx';
import TitleField from '../Commons/TitleField/index.jsx';
import './NewTask.scss';
import { v4 as uuidv4 } from 'uuid';

function NewTask(props) {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const day = yyyy + '-' + mm + '-' + dd;
  const dayCurrent = `${yyyy}-${mm}-${dd}`;

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    title: yup.string().required('Please enter title task'),
    dueDate: yup.string().test('Due date must be greater than today', 'Please enter date', (values) => {
      if (new Date(values).getTime() < new Date(day).getTime()) {
        return false;
      }
      return true;
    }),
  });
  const form = useForm({
    defaultValues: {
      title: '',
      dueDate: dayCurrent,
      description: '',
      piority: 'normal',
      checked: false,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const newValue = {
      ...values,
      id: uuidv4(),
    };
    dispatch(add(newValue));
    form.reset();
  };

  return (
    <div className="newTask">
      <h1 className="heading">New Task</h1>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <TitleField name="title" form={form} placeholder="Add a new task..." />
        <DescriptionField name="description" form={form} />
        <div className="newTask__dateSelect">
          <DueDateField name="dueDate" form={form} />
          <PiorityField name="piority" form={form} />
        </div>

        <button className="button" type="submit">
          add
        </button>
      </form>
    </div>
  );
}

export default NewTask;
