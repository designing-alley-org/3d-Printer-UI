import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputField, { InputFieldProps } from './InputField';

export default {
  title: 'Example/InputField',
  component: InputField,
  argTypes: {
    type: { control: 'text' },
    placeholder: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
    bgcolor: { control: 'color' },
    className: { control: 'text' },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    labelClassName: { control: 'text' },
    id: { control: 'text' },
    onChange: { action: 'changed' }, // Capture onChange event in Storybook
  },
} as Meta;

// Template for all InputField stories
const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState('');

  return <InputField {...args} value={value} onChange={setValue} />;
};

// Default story (without label)
export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter username',
  width: '200px',
  height: '40px',
  bgcolor: '#fff4e6',
  label: 'Username',
  showLabel: true,
  labelClassName: 'custom-label',
  id: 'username-input',
};
