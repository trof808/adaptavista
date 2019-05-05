// @flow

import React from 'react';
import { pure } from 'recompose';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

type SelectComponentProps = {
  items: Array<any>,
  onChange: void,
  activeValue: any,
  label: string
};

const SelectComponent = pure<SelectComponentProps>(({
  items, onChange, activeValue, label
}: SelectComponentProps) => (
  <FormControl className="select-input">
    <InputLabel>{label}</InputLabel>
    <Select
      value={activeValue}
      onChange={onChange}
    >
      {items.map(i => <MenuItem value={i} key={i}>{i}</MenuItem>)}
    </Select>
  </FormControl>
));

export default SelectComponent;
