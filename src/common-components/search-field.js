// @flow

import React from 'react';
import { pure } from 'recompose';

import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';

type SearchFieldProps = {
  onChange: void,
  value: string,
  placeholder: string
}

const SearchField = pure<SearchFieldProps>(({ onChange, placeholder, value }: SearchFieldProps) => (
  <FormControl className="search-form">
    <InputBase
      id="bootstrap-input"
      className="search-input"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  </FormControl>
));

export default SearchField;
