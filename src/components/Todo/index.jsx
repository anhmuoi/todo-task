import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { checked, remove, update } from '../../app/todoSlice.js';
import DescriptionField from '../Commons/DescriptionField/index.jsx';
import DueDateField from '../Commons/DueDateField/index.jsx';
import PiorityField from '../Commons/PiorityField/index.jsx';
import TitleField from '../Commons/TitleField/index.jsx';
import './Todo.scss';

function Todo({ todo }) {
  const [detail, setDetail] = useState(false);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const day = yyyy + '-' + mm + '-' + dd;

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
      id: todo.id,
      title: todo.title,
      dueDate: todo.dueDate,
      description: todo.description,
      piority: todo.piority,
      checked: false,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    setDetail(false);

    dispatch(update(values));
  };

  const handleCheck = (e) => {
    dispatch(checked(todo));
  };

  return (
    <div className="todo">
      <div className="todo__action">
        <div className="todo__checkbox">
          <input onClick={(e) => handleCheck(e)} type="checkbox" name={todo.title} id="todo" />
          <label for={todo.title}>{todo.title}</label>
        </div>
        <div className="todo__button">
          <button className="button__detail" onClick={() => setDetail((prev) => (prev ? false : true))}>
            Detail
          </button>
          <button className="button__remove" onClick={() => dispatch(remove(todo.id))}>
            Remove
          </button>
        </div>
      </div>
      {detail && (
        <div className="todo__detail">
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <TitleField name="title" form={form} placeholder={todo.title} />
            <DescriptionField name="description" form={form} />
            <div className="todo__dateSelect">
              <DueDateField name="dueDate" form={form} />
              <PiorityField name="piority" form={form} />
            </div>

            <button className="button" type="submit">
              Update
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Todo;
