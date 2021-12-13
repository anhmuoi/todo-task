import React from 'react';
import { Controller } from 'react-hook-form';
import './DueDateField.scss';

function DueDateField({ form, name }) {
  const { formState } = form;

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="date">
          <span>Due Date</span>
          <input {...field} type="date" />
          {formState.errors[name] && formState.errors[name].message && (
            <div className="error">{formState.errors[name].type}</div>
          )}
        </div>
      )}
    ></Controller>
  );
}

export default DueDateField;
