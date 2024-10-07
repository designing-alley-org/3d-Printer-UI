import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { InputField, InputFieldProps } from './InputField';

// Meta config for the story
export default {
  title: 'Example/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof InputField>;

// Template for creating stories
const Template: Story<InputFieldProps> = (args) => {
  const [value, setValue] = useState('');

  return <InputField {...args} value={value} onChange={setValue} />;
};

// Default story
export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter your name',
  label: 'Name',
  showLabel: true,
  size: 'medium',
};

// Story with large input
export const Large = Template.bind({});
Large.args = {
  placeholder: 'Enter a large input',
  label: 'Large Input',
  showLabel: true,
  size: 'large',
};

// Story with small input
export const Small = Template.bind({});
Small.args = {
  placeholder: 'Enter a small input',
  label: 'Small Input',
  showLabel: true,
  size: 'small',
};
