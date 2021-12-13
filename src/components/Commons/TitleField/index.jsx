import React from 'react';
import { Controller } from 'react-hook-form';
import './TitleField.scss';

function TitleField({ form, name, placeholder }) {
  const { formState } = form;
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <>
          <input className="TextInput" {...field} type="text" placeholder={placeholder} />
          {formState.errors[name] && formState.errors[name].message && (
            <div className="error">{formState.errors[name].message}</div>
          )}
        </>
      )}
    ></Controller>
  );
}

export default TitleField;
