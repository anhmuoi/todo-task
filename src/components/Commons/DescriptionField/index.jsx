import React from 'react';
import { Controller } from 'react-hook-form';
import './DescriptionField.scss';

function DescriptionField({ form, name }) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <div className="desc">
          <span>Description</span>
          <textarea {...field}></textarea>
        </div>
      )}
    ></Controller>
  );
}

export default DescriptionField;
